import { Link } from "react-router-dom";

function ArticleCard({ article }) {
  return (
    <>
      <h2>
        <Link to={`/articles/${article.article_id}`}>{article.title}</Link>
      </h2>
      <p>
        Topic: {article.topic} | Author: {article.author}
      </p>
      <p>
        {article.votes} votes | {article.comment_count} comments
      </p>
      <p>
        {new Date(article.created_at).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      {article.article_img_url && (
        <img
          src={article.article_img_url}
          alt={`Thumbnail for '${article.title}'`}
        />
      )}
    </>
  );
}

export default ArticleCard;
