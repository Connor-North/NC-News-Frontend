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
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your comment..."
        rows="4"
        disabled={isPosting}
      />
      <button type="submit" disabled={isPosting}>
        {isPosting ? "Posting..." : "Post Comment"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default CommentForm;
