import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Box, CardMedia } from "@mui/material";

function ArticleCard({ article }) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      {article.article_img_url && (
        <CardMedia
          component="img"
          height="140"
          image={article.article_img_url}
          alt={`Thumbnail for '${article.title}'`}
        />
      )}
      <CardContent>
        <Typography
          variant="h6"
          component={Link}
          to={`/articles/${article.article_id}`}
          sx={{ textDecoration: "none", color: "inherit" }}
        >
          {article.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Topic: {article.topic} | Author: {article.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {article.votes} votes | {article.comment_count} comments
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {new Date(article.created_at).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ArticleCard;
