import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList";
import VoteButtons from "../components/VoteButtons";
import CommentForm from "../components/CommentForm";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";

function ArticlePage() {
  const { article_id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);

  const handleNewComment = (newComment) => {
    setComments((curr) => [newComment, ...curr]);
  };

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch(
        `https://nc-news-v7di.onrender.com/api/articles/${article_id}`
      ).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch article");
        return res.json();
      }),
      fetch(
        `https://nc-news-v7di.onrender.com/api/articles/${article_id}/comments`
      ).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch comments");
        return res.json();
      }),
    ])
      .then(([articleData, commentsData]) => {
        setArticle(articleData.article);
        setComments(commentsData.comments);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Container sx={{ mt: 4 }}>
      <Card>
        {article.article_img_url && (
          <CardMedia
            component="img"
            height="300"
            image={article.article_img_url}
            alt={`Image for article titled '${article.title}'`}
          />
        )}
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {article.title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Topic: {article.topic} | Author: {article.author}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
            Published:{" "}
            {new Date(article.created_at).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
          <Typography variant="body1" paragraph>
            {article.body}
          </Typography>
          <VoteButtons
            article_id={article.article_id}
            initialVotes={article.votes}
          />
          <Typography variant="h6" sx={{ mt: 4 }}>
            {article.comment_count} comments
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ mt: 4 }}>
        <Card variant="outlined">
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Leave a comment
            </Typography>
            <CommentForm
              article_id={article.article_id}
              onCommentPosted={handleNewComment}
            />
          </CardContent>
        </Card>
        <Box sx={{ mt: 4 }}>
          <CommentsList comments={comments} />
        </Box>
      </Box>
    </Container>
  );
}

export default ArticlePage;
