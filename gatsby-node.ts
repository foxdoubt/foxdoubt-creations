import type { CreateSchemaCustomizationArgs, GatsbyNode } from "gatsby";
import { ShowQueryEdges } from "./src/util/create-artwork-post-context";
import {
  createArtworkPostsFromShow,
  createShowIntroductionPosts,
} from "./src/util/create-pages";

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
  const { data: showsData, errors: showsErrors } =
    await graphql<Queries.GetAllShowsQuery>(`
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
    createArtworkPostsFromShow(node, actions);
    createShowIntroductionPosts(node, actions);
  });
};
