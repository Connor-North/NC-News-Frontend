import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { Container, Typography, Box, Paper } from "@mui/material";

function HomePage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://nc-news-v7di.onrender.com/api/articles/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch articles");
        }
        return res.json();
      })
      .then((res) => {
        setArticles(res.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Paper sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", py: 4 }}>
      <Container>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Articles
        </Typography>
        <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
          {articles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </Box>
      </Container>
    </Paper>
  );
}

export default HomePage;
