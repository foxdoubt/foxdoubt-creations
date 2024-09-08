import * as React from "react";
import isNull from "lodash/isNull";
import { PageProps, graphql, Link } from "gatsby";
import { GatsbyImage, StaticImage } from "gatsby-plugin-image";

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

  const currentPostPath = `/artwork/${currentSlug}`;

  const prevPostPath = !isNull(previousSlug)
    ? `/artwork/${previousSlug}`
    : currentPostPath;

  const nextPostPath = !isNull(nextSlug)
    ? `/artwork/${nextSlug}`
    : currentPostPath;

  return (
    <div className="artwork-template-container">
      <div className="flex-column-center artwork-label">
        <h3 className="artwork-title">{title}</h3>
        <div className="navigation-container">
          <Link to={prevPostPath}>
            <StaticImage src={"../../images/caret-left.svg"} alt="left-arrow" />
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
        <GatsbyImage alt={title} image={gatsbyImageData} />
      )}
    </div>
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
        asset {
          gatsbyImageData
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

export default Artwork;
