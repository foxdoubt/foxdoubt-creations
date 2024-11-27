import * as React from "react";

export default ({
  wordCount,
  readTime,
  author,
  title,
  description,
  lastUpdatedAt,
}: Partial<Queries.PostContext>) => {
  return (
    <div className="post-title-container">
      <div className="post-title">
        <h3 className="font-heading post-title-text">{title}</h3>
        {description && (
          <p className="font-secondary post-description">{description}</p>
        )}
        <p className="byline">{`By ${author}`}</p>
      </div>

      <div className="post-additional-data">
        <p className="last-updated-at">{`Posted ${lastUpdatedAt}`}</p>
        <p className="read-time">{`Read time: ${readTime}m (${wordCount?.toLocaleString()} words)`}</p>
      </div>
    </div>
  );
};
