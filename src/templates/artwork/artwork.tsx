import * as React from "react";
import isNull from "lodash/isNull";
import { PageProps, graphql, Link } from "gatsby";
import {
  GatsbyImage,
  IGatsbyImageData,
  StaticImage,
} from "gatsby-plugin-image";
import SanityImage from "gatsby-plugin-sanity-image";
import Layout from "../../shared-components/layout/layout";

const { useState } = React;

const getMainImageProps = (
  title: string,
  imageData: IGatsbyImageData,
  hotspot: { width: number | null; height: number | null } | null | undefined,
  showOriginalDims: boolean
) => {
  let finalProps: {
    alt: string;
    loading: "eager" | "lazy";
    image: IGatsbyImageData;
  } = {
    alt: title,
    loading: "eager",
    image: imageData,
  };
  if (!showOriginalDims) {
    const croppedWidth = hotspot?.width || 1;
    const croppedHeight = hotspot?.height || 1;
    const width = imageData.width * croppedWidth;
    const height = imageData.height * croppedHeight;
    console.log(hotspot, width, height);
    finalProps.image = { ...finalProps.image, ...{ width, height } };
  }
  return finalProps;
};

const Artwork = ({
  data,
  pageContext,
}: PageProps<Queries.GetArtworkPostQuery, Queries.SitePageContext>) => {
  const title = data.sanityArtwork?.title;
  const medium = data.sanityArtwork?.medium;
  const size = data.sanityArtwork?.size;
  const completionYear = data.sanityArtwork?.completionYear;
  const gatsbyImageData = data.sanityArtwork?.mainImage?.asset?.gatsbyImageData;
  const { previousSlug, nextSlug, currentSlug } = pageContext;
  const hotspot = data.sanityArtwork?.mainImage?.hotspot;

  const [showOriginalDimensions, setShowOriginalDimensions] = useState(
    !(hotspot?.height || hotspot?.width)
  );
  const currentPostPath = `/artwork/${currentSlug}`;

  const prevPostPath = !isNull(previousSlug)
    ? `/artwork/${previousSlug}`
    : currentPostPath;

  const nextPostPath = !isNull(nextSlug)
    ? `/artwork/${nextSlug}`
    : currentPostPath;

  const croppedMessage = "Cropped for optimum viewing on mobile devices.";

  return (
    <Layout>
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
          <GatsbyImage
            {...getMainImageProps(
              title,
              gatsbyImageData,
              hotspot,
              showOriginalDimensions
            )}
          />
        )}
        <p>{!showOriginalDimensions && croppedMessage}</p>
        <p
          onClick={() => {
            setShowOriginalDimensions(!showOriginalDimensions);
          }}
        >
          {!showOriginalDimensions && "Click to view original dimensions"}
        </p>
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
          gatsbyImageData(placeholder: BLURRED)
        }
      }
      publishedAt
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
// export const query = graphql`
//   query GetArtworkPost($slug: SanitySlugFilterInput) {
//     sanityArtwork(slug: $slug) {
//       size
//       medium
//       completionYear
//       title
//       mainImage {
//         ...ImageWithPreview
//       }
//       publishedAt
//       body {
//         children {
//           text
//           marks
//         }
//         style
//         listItem
//       }
//     }
//   }
// `;

export default Artwork;
