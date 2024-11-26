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
    <div className="title-container">
      <h3 className="font-heading">{title}</h3>
      {description && <p className="font-secondary">{description}</p>}
      <p className="font-bold">{`By ${author}`}</p>

      <div className="post-additional-data">
        <p>{`Posted ${lastUpdatedAt}`}</p>
        <p>{`Read time: ${readTime}m (${wordCount} words)`}</p>
      </div>
    </div>
  );
};
