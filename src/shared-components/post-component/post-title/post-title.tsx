import * as React from "react";
import { GatsbyImage } from "gatsby-plugin-image";

export default ({
  wordCount,
  readTime,
  author,
  title,
  description,
  lastUpdatedAt,
  mainImage,
}: Partial<Queries.PostContext>) => {
  const authorHtml = author && <p className="byline">{`By ${author}`}</p>;

  const titleImageHtml = mainImage?.asset?.gatsbyImageData && (
    <GatsbyImage
      className="post-title-image-container"
      image={{
        ...mainImage?.asset?.gatsbyImageData,
        // width: 300,
        // height: 300,
      }}
      alt={mainImage.asset.altText || "post title image"}
    />
  );

  const descriptionHtml = description && (
    <p className="font-secondary post-description">{description}</p>
  );

  const lastUpdatedAtHtml = lastUpdatedAt && (
    <p className="last-updated-at">{`Posted ${lastUpdatedAt}`}</p>
  );

  const readTimeAndWordCountHtml = readTime && wordCount && (
    <p className="read-time">{`Read time: ${readTime}m (${wordCount?.toLocaleString()} words)`}</p>
  );

  const additionalDataHtml = (lastUpdatedAt || readTime || wordCount) && (
    <div className="post-additional-data">
      {lastUpdatedAtHtml}
      {readTimeAndWordCountHtml}
    </div>
  );

  return (
    <div className="post-title-container">
      <div className="post-title">
        <h3 className="font-heading post-title-text">{title}</h3>
      </div>
      {titleImageHtml}
      {descriptionHtml}
      {authorHtml}

      {additionalDataHtml}
    </div>
  );
};
