import { Card, CardContent, Typography, Box } from "@mui/material";
function CommentsList({ comments }) {
  if (!comments) return <p>Loading comments...</p>;
  if (comments.length === 0) return <p>No comments yet..</p>;

  return (
    <section>
      <h2>Comments</h2>
      {comments.map((comment) => (
        <Card key={comment.comment_id} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle2" color="text.secondary">
                {comment.author}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {new Date(comment.created_at).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Typography>
            </Box>
            <Typography variant="body1" sx={{ mt: 1 }}>
              {comment.body}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {comment.votes} votes
            </Typography>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export default CommentsList;
