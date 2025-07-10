import { useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";
import { Container, Typography, Grid, Paper } from "@mui/material";

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
          All Articles
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          {articles.map((article) => (
            <Grid item xs={12} sm={6} md={4} key={article.article_id}>
              <ArticleCard article={article} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Paper>
  );
}

export default HomePage;
