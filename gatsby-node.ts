import type {
  CreateSchemaCustomizationArgs,
  GatsbyNode,
  PageProps,
} from "gatsby";
import path from "path";
import {
  ShowQueryEdges,
  createArtworkPageContext,
} from "./src/util/create-artwork-page";

export const createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;

  createTypes(`
    type ArtworkTemplateContext {
      currentSlug: String!
      previousSlug: String!
      nextSlug: String!
    }

    type PostContext {
      value: JSON!
      title: String
    }
  `);
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  // TODO: come back and encapsulate each concern here into its own function

  // handle shows taxonomy for artwork
  const { data: showsData, errors: showsErrors } = await graphql<
    PageProps<Queries.GetAllShowsQuery>["data"]
  >(`
    query GetAllShows {
      allSanityShow(sort: {selectedWorks: {publishedAt: ASC}}) {
        edges {
          node {
            name
            _rawIntroduction
            slug {
              current
            }
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

  if (showsErrors) {
    throw showsErrors;
  }
  const edges: ShowQueryEdges = showsData?.allSanityShow.edges || [];

  edges.forEach(({ node }) => {
    const showSlug = node.slug?.current || "misc";
    node.selectedWorks?.forEach((work, index) => {
      if (work && work.slug?.current) {
        actions.createPage({
          path: `/artwork/${showSlug}/${work.slug.current}`,
          component: path.resolve(`./src/templates/artwork/artwork.tsx`),
          context: createArtworkPageContext(
            work,
            node.selectedWorks,
            showSlug,
            index
          ),
        });
      }
    });

    if (node._rawIntroduction) {
      actions.createPage({
        path: `/artwork/${node.slug?.current || "misc"}/introduction`,
        component: path.resolve(`./src/templates/post/post.tsx`),
        context: {
          value: node._rawIntroduction,
          title: `${node.name || "Show"} Introduction`,
        },
      });
    }
  });
};
