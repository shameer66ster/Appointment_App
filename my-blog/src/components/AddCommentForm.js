import React from "react";
import { useState } from "react";
import axios from "axios";

const AddCommentForm = ({ articleName, onAricleUpdated }) => {
  const [name, setName] = useState("");
  const [commentText, setCommentText] = useState("");

  const addComment = async () => {
    const response = await axios.post(`/api/articles/${articleName}/comments`, {
      postedBy: name,
      text: commentText,
    });
    const updatedArticle = response.data;
    onAricleUpdated(updatedArticle);
    setName("");
    setCommentText("");
  };
  return (
    <div id="add-comment-form">
      <h3>Add a Comment</h3>
      <label htmlFor="">
        Name :
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
        />
      </label>
      <label htmlFor="">
        Comment:
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          name=""
          id=""
          cols="50"
          rows="4"
        ></textarea>
      </label>
      <button onClick={addComment}>Add Comment</button>
    </div>
  );
};

export default AddCommentForm;
