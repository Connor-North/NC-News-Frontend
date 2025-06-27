import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArticleCard from "../components/ArticleCard";

function TopicPage() {
  const { topic_slug } = useParams();
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://nc-news-v7di.onrender.com/api/articles?topic=${topic_slug}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load articles");
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [topic_slug]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (articles.length === 0) return <p>No articles for this topic.</p>;

  return (
    <main>
      <h1>
        {topic_slug.charAt(0).toUpperCase() + topic_slug.slice(1)} Articles
      </h1>
      <ul>
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </ul>
    </main>
  );
}

export default TopicPage;
