function CommentsList({ comments }) {
  if (!comments) return <p>Loading comments...</p>;
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
