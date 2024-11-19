import * as React from "react";
import { isNull } from "lodash";
import useScreenDimensions from "../../hooks/use-screen-dimensions";

import { PageProps, graphql, Link } from "gatsby";
import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage,
  GatsbyImageProps,
} from "gatsby-plugin-image";

import Layout from "../../shared-components/layout/layout";
import PostBody from "../../shared-components/post-body/post-body";

const MOBILE_BREAKPOINT_WIDTH = 480;

const { useState } = React;

const getMainImageProps = (
  title: string,
  imageData: IGatsbyImageData,
  hotspot: { width: number | null; height: number | null } | null | undefined,
  showCroppedDims: boolean
) => {
  let finalProps: GatsbyImageProps = {
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
  sanityArtwork,
}: PageProps<Queries.GetArtworkPostQuery>["data"]) => {
  if (sanityArtwork?._rawBody) {
    const value = sanityArtwork._rawBody as any;
    return <PostBody value={value} title="Description" />;
  }
  return null;
};

const Artwork = ({
  data,
  pageContext,
  location,
}: PageProps<Queries.GetArtworkPostQuery, Queries.SitePageContext>) => {
  const title = data.sanityArtwork?.title;
  const medium = data.sanityArtwork?.medium;
  const size = data.sanityArtwork?.size;
  const completionYear = data.sanityArtwork?.completionYear;
  const gatsbyImageData = data.sanityArtwork?.mainImage?.asset?.gatsbyImageData;
  const { previousSlug, nextSlug, currentSlug } = pageContext;
  const hotspot = data.sanityArtwork?.mainImage?.hotspot;
  const hasImageCrop = Boolean(hotspot?.height || hotspot?.width);

  const screenDimensions = useScreenDimensions();
  const isUserOnMobileDevice =
    screenDimensions.width <= MOBILE_BREAKPOINT_WIDTH;

  const [shouldShowCroppedImage, setShouldShowCroppedImage] =
    useState(hasImageCrop);

  const prevPostPath = !isNull(previousSlug) ? previousSlug : currentSlug;

  const nextPostPath = !isNull(nextSlug) ? nextSlug : currentSlug;

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

  return (
    <Layout pathname={location.pathname}>
      <div className="artwork-template-container">
        <div className="flex-column-center artwork-label">
          <h3 className="artwork-title">{title}</h3>
          <div className="navigation-container">
            <Link to={prevPostPath}>
              <StaticImage
                src={"../../images/caret-left.svg"}
                alt="left-arrow"
              />
            </Link>

            <div className="flex-column-center">
              <p className="artwork-description">{[medium, size].join(", ")}</p>
              <p className="artwork-year">{completionYear}</p>
            </div>

            <Link to={nextPostPath}>
              <StaticImage
                src={"../../images/caret-right.svg"}
                alt="right-arrow"
              />
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
        <div className="artwork-options-container full-width-container">
          <div className="artwork-options">
            {artworkMessageHtml}
            {artworkFormatButtonHtml}
          </div>
        </div>
        <ArtworkPostBody {...data} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query GetArtworkPost($slug: SanitySlugFilterInput) {
    sanityArtwork(slug: $slug) {
      size
      medium
      completionYear
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
      publishedAt
      _rawBody
      body {
        children {
          text
          marks
        }
        style
        listItem
      }
    }
  }
`;

export default Artwork;
