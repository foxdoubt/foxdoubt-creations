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
      const prevIndex = index > 0 ? index - 1 : null;
      const nextIndex = index < edges.length - 1 ? index + 1 : null;
      const previousPost =
        prevIndex !== null ? edges[prevIndex].node.slug?.current : null;
      const nextPost =
        nextIndex !== null ? edges[nextIndex].node.slug?.current : null;
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
