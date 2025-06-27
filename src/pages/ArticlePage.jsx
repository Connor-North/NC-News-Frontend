import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentsList from "../components/CommentsList";
import VoteButtons from "../components/VoteButtons";
import CommentForm from "../components/CommentForm";

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
    <article>
      <h1>{article.title}</h1>
      <p>Topic: {article.topic}</p>
      <p>Author:{article.author}</p>
      <p>
        Published:{" "}
        {new Date(article.created_at).toLocaleDateString("en-GB", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <p>{article.body}</p>

      <VoteButtons
        article_id={article.article_id}
        initialVotes={article.votes}
      />

      <p>{article.comment_count} comments</p>
      {article.article_img_url && (
        <img
          src={article.article_img_url}
          alt={`Image for article titled '${article.title}'`}
        />
      )}
      <CommentForm
        article_id={article.article_id}
        onCommentPosted={handleNewComment}
      />
      <CommentsList comments={comments} />
    </article>
  );
}

export default ArticlePage;
