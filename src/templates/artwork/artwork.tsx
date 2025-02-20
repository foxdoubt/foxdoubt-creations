import * as React from "react";
import useScreenDimensions from "../../hooks/use-screen-dimensions";
import leftArrow from "../../images/caret-left.svg";
import rightArrow from "../../images/caret-right.svg";
import { ArbitraryTypedObject } from "@portabletext/types";
import CONSTANTS from "../../util/constants";

import { PageProps, graphql, Link } from "gatsby";
import {
  GatsbyImage,
  IGatsbyImageData,
  GatsbyImageProps,
} from "gatsby-plugin-image";

import Layout from "../../shared-components/layout/layout";
import PostBody from "../../shared-components/post-component/post-body/post-body";

const { useState } = React;

const getMainImageProps = (
  title: string,
  imageData: IGatsbyImageData,
  hotspot: { width: number | null; height: number | null } | null | undefined,
  showCroppedDims: boolean
) => {
  const finalProps: GatsbyImageProps = {
    alt: title,
    loading: "eager",
    image: imageData,
    imgClassName: "artwork-image",
  };
  if (showCroppedDims) {
    const croppedWidth = hotspot?.width || 1;
    const croppedHeight = hotspot?.height || 1;
    const width = imageData.width * croppedWidth;
    const height = imageData.height * croppedHeight;
    finalProps.image = {
      ...finalProps.image,
      ...{ width, height },
    };
  }
  return finalProps;
};

const ArtworkPostBody = ({
  value,
}: {
  value: Record<string, unknown> | null;
}) => {
  return (
    <div className="post flex-row-center artwork-post-container">
      <div className="post-inner-container">
        <div className="post-body">
          <PostBody value={value as ArbitraryTypedObject} />
        </div>
      </div>
    </div>
  );
};

const Artwork = ({
  data,
  pageContext,
  location,
}: PageProps<Queries.GetArtworkPostQuery, Queries.ArtworkTemplateContext>) => {
  const title = data.sanityArtwork?.title;
  const medium = data.sanityArtwork?.medium;
  const size = data.sanityArtwork?.size;
  const completionYear = data.sanityArtwork?.completionYear;
  const gatsbyImageData = data.sanityArtwork?.mainImage?.asset?.gatsbyImageData;
  const { previousArtworkPostPath, nextArtworkPostPath } = pageContext;
  const hotspot = data.sanityArtwork?.mainImage?.hotspot;
  const hasImageCrop = Boolean(hotspot?.height || hotspot?.width);

  const screenDimensions = useScreenDimensions();

  const isUserOnMobileDevice =
    screenDimensions.width <= CONSTANTS.mobileBreakpointWidth;

  const [shouldShowCroppedImage, setShouldShowCroppedImage] =
    useState(hasImageCrop);

  const artworkViewMessages = {
    croppedMessage: "cropped for optimum viewing on mobile devices.",
    originalFormatMessage: "click to view original format.",
    backToCroppedMessage: "click to view cropped format.",
  };

  const artworkMessageHtml =
    isUserOnMobileDevice && shouldShowCroppedImage ? (
      <p className="font-main artwork-message">
        {artworkViewMessages.croppedMessage}
      </p>
    ) : null;

  const artworkFormatButtonHtml =
    isUserOnMobileDevice && hasImageCrop ? (
      <button
        className="font-main button-main"
        onClick={() => {
          setShouldShowCroppedImage(!shouldShowCroppedImage);
        }}
      >
        {shouldShowCroppedImage
          ? artworkViewMessages.originalFormatMessage
          : artworkViewMessages.backToCroppedMessage}
      </button>
    ) : null;

  const artworkOptionsHtml = (artworkMessageHtml ||
    artworkFormatButtonHtml) && (
    <div className="artwork-options-container full-width-container">
      <div className="artwork-options">
        {artworkMessageHtml}
        {artworkFormatButtonHtml}
      </div>
    </div>
  );

  const artworkPostHtml = data.sanityArtwork?._rawBody ? (
    <ArtworkPostBody value={data.sanityArtwork?._rawBody} />
  ) : null;

  let containerClassnames = `artwork-template-container`;
  if (!isUserOnMobileDevice && !artworkPostHtml) {
    containerClassnames = containerClassnames.concat(" margin-bottom");
  }

  return (
    <Layout pathname={location.pathname}>
      <div className={containerClassnames}>
        <div className="flex-column-center artwork-label">
          <h3 className="artwork-title">{title}</h3>
          <div className="navigation-container">
            <Link to={previousArtworkPostPath}>
              <img src={leftArrow} alt="left-arrow" />
            </Link>

            <div className="flex-column-center">
              <p className="artwork-description">{[medium, size].join(", ")}</p>
              <p className="artwork-year">{completionYear}</p>
            </div>

            <Link to={nextArtworkPostPath}>
              <img src={rightArrow} alt="right-arrow" />
            </Link>
          </div>
        </div>
        {gatsbyImageData && title && (
          <div className="full-width-container flex-row-center">
            <div className="artwork-image-wrapper">
              <GatsbyImage
                {...getMainImageProps(
                  title,
                  gatsbyImageData,
                  hotspot,
                  shouldShowCroppedImage && isUserOnMobileDevice
                )}
              />
            </div>
          </div>
        )}

        {artworkOptionsHtml}
        {artworkPostHtml}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query GetArtworkPost($slug: SanitySlugFilterInput) {
    sanityArtwork(slug: $slug) {
      size
      medium
      completionYear(formatString: "MMMM YYYY")
      title
      mainImage {
        hotspot {
          width
          height
        }
        asset {
          gatsbyImageData(
            placeholder: BLURRED,
            height: 800
          )
        }
      }
      _rawBody
    }
  }
`;

export default Artwork;
