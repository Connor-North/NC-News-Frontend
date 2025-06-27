import { useState } from "react";

function VoteButtons({ article_id, initialVotes }) {
  const [votes, setVotes] = useState(initialVotes);
  const [error, setError] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (voteChange) => {
    if (hasVoted) return;
    setVotes((currVotes) => currVotes + voteChange);
    setHasVoted(true);

    fetch(`https://nc-news-v7di.onrender.com/api/articles/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: voteChange }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Vote failed");
        return res.json();
      })
      .catch((err) => {
        setVotes((currVotes) => currVotes - voteChange);
        setError("Failed to register your vote.");
        setHasVoted(false);
      });
  };

  return (
    <div className="vote-controls">
      <p>
        <strong>Votes:</strong> {votes}
      </p>
      <button onClick={() => handleVote(1)} disabled={hasVoted}>
        👍
      </button>
      <button onClick={() => handleVote(-1)} disabled={hasVoted}>
        👎
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default VoteButtons;
