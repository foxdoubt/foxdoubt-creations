import * as React from "react";
import { GatsbyImage, GatsbyImageProps } from "gatsby-plugin-image";

const PostMainImage = ({
  image,
  mainImageCaption,
}: {
  image: Queries.Maybe<Queries.SanityImage>;
  mainImageCaption?: string | null;
}) => {
  if (!image?.asset?.gatsbyImageData) return null;
  const { gatsbyImageData, altText } = image.asset;
  const mainImageCaptionHtml = mainImageCaption && (
    <p className="post-main-image-caption">{mainImageCaption}</p>
  );
  const imageProps: GatsbyImageProps = {
    loading: "eager",
    className: "post-main-image",
    objectFit: "contain",
    image: gatsbyImageData,
    alt: altText || "post main image",
  };
  return (
    <div className="post-main-image-container">
      <GatsbyImage {...imageProps} />
      {mainImageCaptionHtml}
    </div>
  );
};

export default PostMainImage;
