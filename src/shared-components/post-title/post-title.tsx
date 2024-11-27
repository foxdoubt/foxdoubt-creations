import * as React from "react";

export default ({
  wordCount,
  readTime,
  author,
  title,
  description,
  lastUpdatedAt,
}: Partial<Queries.PostContext>) => {
  const authorHtml = author && <p className="byline">{`By ${author}`}</p>;
  let additionalDataHtml = null;
  const hasAdditionalData = lastUpdatedAt || readTime || wordCount;
  if (hasAdditionalData) {
    additionalDataHtml = (
      <div className="post-additional-data">
        {lastUpdatedAt && (
          <p className="last-updated-at">{`Posted ${lastUpdatedAt}`}</p>
        )}
        {readTime && wordCount && (
          <p className="read-time">{`Read time: ${readTime}m (${wordCount?.toLocaleString()} words)`}</p>
        )}
      </div>
    );
  }

  return (
    <div className="post-title-container">
      <div className="post-title">
        <h3 className="font-heading post-title-text">{title}</h3>
        {description && (
          <p className="font-secondary post-description">{description}</p>
        )}
        {authorHtml}
      </div>

      {additionalDataHtml}
    </div>
  );
};
