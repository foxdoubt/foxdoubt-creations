import React from "react";
import { graphql } from "gatsby";

export const query = graphql`
query GetAllArtworksForShow($showName: SanityArtworkFilterInput) {
  allSanityArtwork(filter: $showName) {
    edges {
      node {
        mainImage {
          asset {
            url
          }
        }
      }
    }
  }
}
`;
