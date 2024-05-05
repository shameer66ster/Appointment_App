import { MongoClient } from "mongodb";
let db;
async function connectToDb(cb) {
  const client = new MongoClient(
    "mongodb+srv://shameer123:qb3f5Yk3hiFrfZ3k@shamzmongo.p9mtd1j.mongodb.net/?retryWrites=true&w=majority&appName=ShamzMongo"
  );
  await client.connect();
  db = client.db("testdbarticles");
  cb();
}
export { db, connectToDb };
