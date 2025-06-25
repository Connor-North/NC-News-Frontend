import { useDebugValue, useEffect, useState } from "react";
import ArticleCard from "../components/ArticleCard";

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
    <main>
      <h1>Articles</h1>
      <ul>
        {articles.map((article) => {
          <ArticleCard key={article.article_id} article={article} />;
        })}
      </ul>
    </main>
  );
}

export default HomePage;
