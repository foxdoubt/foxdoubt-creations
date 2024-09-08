import type {
  CreateSchemaCustomizationArgs,
  GatsbyNode,
  PageProps,
} from "gatsby";
import path from "path";
import {
  ArtworkQueryEdges,
  createArtworkPageContext,
  CreateArtworkPageContext,
} from "./src/util/create-artwork-page";

export const createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;
  createTypes(`
    type SitePage implements Node {
      context: SitePageContext
    }
    ${CreateArtworkPageContext}
  `);
};

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
      actions.createPage({
        path: `/artwork/${node.slug.current}`,
        component: path.resolve(`./src/templates/artwork/artwork.tsx`),
        context: createArtworkPageContext(node, edges, index),
      });
    }
  });
};
