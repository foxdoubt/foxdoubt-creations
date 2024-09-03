import type { GatsbyNode, PageProps } from "gatsby";
import path from "path";

type ArtworkQueryEdges =
  PageProps<Queries.GetAllArtworkQuery>["data"]["allSanityArtwork"]["edges"];

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { data, errors } = await graphql<
    PageProps<Queries.GetAllArtworkQuery>["data"]
  >(`
    query GetAllArtwork {
      allSanityArtwork {
        edges {
          node {
            title
            slug {
              current
            }
            medium
            size
            completionYear
            mainImage {
              _key
            }
            body {
              _rawChildren
            }
          }
        }
      }
    }
  `);
  if (errors) {
    throw errors;
  }
  const edges: ArtworkQueryEdges = data?.allSanityArtwork.edges || [];

  edges.forEach(({ node }) => {
    if (node.slug?.current) {
      actions.createPage({
        path: `/artwork/${node.slug.current}`,
        component: path.resolve(`./src/templates/artwork/artwork.tsx`),
        context: { node },
      });
    }
  });
};
