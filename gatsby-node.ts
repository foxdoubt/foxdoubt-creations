import type { GatsbyNode, PageProps } from "gatsby";
// import { isNull, isUndefined } from "lodash";
import path from "path";
import {
  getPreviousSlug,
  getNextSlug,
  ArtworkQueryEdges,
} from "./src/util/create-artwork-page";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { data, errors } = await graphql<
    PageProps<Queries.GetAllArtworkQuery>["data"]
  >(`
    query GetAllArtwork {
      allSanityArtwork(sort: { publishedAt: ASC }) {
        edges {
          node {
            slug {
              current
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

  edges.forEach(({ node }, index) => {
    if (node.slug?.current) {
      const previousPost = getPreviousSlug(edges, index);
      const nextPost = getNextSlug(edges, index);
      const context = {
        slug: { current: { eq: node.slug.current } },
        previousPost,
        nextPost,
      };
      actions.createPage({
        path: `/artwork/${node.slug.current}`,
        component: path.resolve(`./src/templates/artwork/artwork.tsx`),
        context,
      });
    }
  });
};
