import * as React from "react";
import { PageProps, graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

const Artwork = ({
  data,
  pageContext,
}: PageProps<Queries.GetArtworkPostQuery>) => {
  const title = data.sanityArtwork?.title;
  const medium = data.sanityArtwork?.medium;
  const size = data.sanityArtwork?.size;
  const completionYear = data.sanityArtwork?.completionYear;
  const gatsbyImageData = data.sanityArtwork?.mainImage?.asset?.gatsbyImageData;
  return (
    <div className="artwork-template-container">
      <div className="flex-column-center artwork-label">
        <h3 className="artwork-title">{title}</h3>
        <div className="navigation-container">
          {(pageContext as any).previousPost ? (
            <Link to={`/artwork/${(pageContext as any).previousPost}`}>
              <p>prev</p>
            </Link>
          ) : (
            <p>prev</p>
          )}
          <div className="flex-column-center">
            <p className="artwork-description">{[medium, size].join(", ")}</p>
            <p className="artwork-year">{completionYear}</p>
          </div>
          {(pageContext as any).nextPost ? (
            <Link to={`/artwork/${(pageContext as any).nextPost}`}>
              <p>next</p>
            </Link>
          ) : (
            <p>next</p>
          )}
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
