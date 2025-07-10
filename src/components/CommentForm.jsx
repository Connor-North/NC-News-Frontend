import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";

function CommentForm({ article_id, onCommentPosted }) {
  const [body, setBody] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!body.trim()) {
      setError("Comment cannot be empty.");
      return;
    }

    setIsPosting(true);
    setError(null);

    fetch(
      `https://nc-news-v7di.onrender.com/api/articles/${article_id}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "jessjelly",
          body: body.trim(),
        }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to post comment");
        return res.json();
      })
      .then((data) => {
        setBody("");
        onCommentPosted(data.comment);
      })
      .catch((err) => {
        setError("Oops! Couldn't post your comment.");
      })
      .finally(() => {
        setIsPosting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Write your comment..."
          multiline
          rows={4}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Write your comment..."
          disabled={isPosting}
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={isPosting}>
          {isPosting ? "Posting..." : "Post Comment"}
        </Button>
        {error && (
          <Typography color="error" variant="body2">
            {error}
          </Typography>
        )}
      </Box>
    </form>
  );
}

export default CommentForm;
