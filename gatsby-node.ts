import type { CreateSchemaCustomizationArgs, GatsbyNode } from "gatsby";
import { ShowQueryEdges } from "./src/util/types";
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
      currentArtworkPostPath: String!
      previousArtworkPostPath: String!
      nextArtworkPostPath: String!
    }

    type PostContext {
      value: JSON!
      title: String
      wordCount: Int
      readTime: String
      author: String
      description: String
      lastUpdatedAt: String!
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
            _updatedAt(formatString: "MMMM D, YYYY")
            _rawIntroduction
            author {
              name
            }
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
  const { createPage } = actions;

  edges.forEach(({ node }) => {
    createArtworkPostsFromShow(node, createPage);
    createShowIntroductionPosts(node, createPage);
  });
};
