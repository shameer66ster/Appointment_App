import express from "express";
import { db, connectToDb } from "./db.js";
let articlesInfo = [
  {
    name: "learn-react",
    upvotes: 0,
    comments: [],
  },
  {
    name: "learn-node",
    upvotes: 0,
    comments: [],
  },
  {
    name: "mongodb",
    upvotes: 0,
    comments: [],
  },
];

const app = express();
app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
  const { name } = req.params;

  try {
    // Find the article by name
    const article = await db.collection("articles").findOne({ name });

    // Respond with the article JSON
    res.json(article);
  } catch (error) {
    console.error("Error retrieving article:", error);
    res.status(500).json({ error: "Internal Server Error" });
    // } finally {
    //   // Close the connection if it was opened
    //   if (client) {
    //     await client.close();
    //   }
  }
});

app.put("/api/articles/:name/upvote", async (req, res) => {
  const { name } = req.params;
  await db.collection("articles").updateOne(
    { name },
    {
      $inc: { upvotes: 1 },
    }
  );
  const article = await db.collection("articles").findOne({ name });
  if (article) {
    res.json(article);
  } else {
    res.send(`That article doesn't exist !`);
  }
});

app.post("/api/articles/:name/comments", async (req, res) => {
  const { name } = req.params;
  const { postedBy, text } = req.body;
  await db.collection("articles").updateOne(
    { name },
    {
      $push: { comments: { postedBy, text } },
    }
  );
  const article = await db.collection("articles").findOne({ name });

  if (article) {
    res.json(article);
  } else {
    res.send(`That article doesn't exist !`);
  }
});

// app.post("/hello", (req, res) => {
//   console.log(req.body);
//   res.send(`Hello ${req.body.name}`);
// });

// app.get("/hello/:name", (req, res) => {
//   const { name } = req.params;
//   res.send(`Hello ${name}!!!`);
// });

connectToDb(() => {
  app.listen(8000, () => {
    console.log("Server is listning to port 8000");
  });
});
