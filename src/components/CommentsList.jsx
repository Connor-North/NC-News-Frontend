import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CommentsList() {
  const { article_id } = useParams();
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://nc-news-v7di.onrender.com/api/articles/${article_id}/comments`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Could not load comments");
        return res.json();
      })
      .then((data) => {
        setComments(data.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error: {error}</p>;
  if (comments.length === 0) return <p>No comments yet..</p>;

  return (
    <section>
      <h2>Comments</h2>
      <ul className="comments-list">
        {comments.map((comment) => {
          return (
            <li key={comment.comment_id} className="comment-card">
              <p>
                {comment.author} -{" "}
                {new Date(comment.created_at).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p>{comment.body}</p>
              <p>{comment.votes} votes</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CommentsList;
