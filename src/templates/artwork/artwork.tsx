import * as React from "react";
import { PageProps, graphql } from "gatsby";

const Artwork = ({ data }: PageProps<Queries.GetArtworkPostQuery>) => {
  const title = data.sanityArtwork?.title;
  const medium = data.sanityArtwork?.medium;
  const size = data.sanityArtwork?.size;
  const completionYear = data.sanityArtwork?.completionYear;
  return (
    <div className="artwork-template-container">
      <div className="flex-column-center artwork-label">
        <h3 className="artwork-title">{title}</h3>
        <p className="artwork-description">{[medium, size].join(", ")}</p>
        <p className="artwork-year">{completionYear}</p>
      </div>
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
