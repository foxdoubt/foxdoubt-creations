import type {
  CreateSchemaCustomizationArgs,
  GatsbyNode,
  PageProps,
} from "gatsby";
import path from "path";
import {
  ShowQueryEdges,
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
  // handle shows taxonomy for artwork
  const { data, errors } = await graphql<
    PageProps<Queries.GetAllShowsQuery>["data"]
  >(`
    query GetAllShows {
      allSanityShow(sort: {selectedWorks: {publishedAt: ASC}}) {
        edges {
          node {
            name
            selectedWorks {
              slug {
                current
              }
            }
          }
        }
      }
    }
`);

  if (errors) {
    throw errors;
  }
  const edges: ShowQueryEdges = data?.allSanityShow.edges || [];

  edges.forEach(({ node }) => {
    const showName = node.name || "misc";
    node.selectedWorks?.forEach((work, index) => {
      if (work && work.slug?.current) {
        actions.createPage({
          path: `/artwork/${showName}/${work.slug.current}`,
          component: path.resolve(`./src/templates/artwork/artwork.tsx`),
          context: createArtworkPageContext(
            work,
            node.selectedWorks,
            showName,
            index
          ),
        });
      }
    });
  });
};
