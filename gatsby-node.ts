import type { CreateSchemaCustomizationArgs, GatsbyNode } from "gatsby";
import { ShowQueryEdges } from "./src/util/types";
import {
  createArtworkPostsFromShow,
  createShowIntroductionPosts,
  createAllPosts,
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
      title: String
      description: String
      author: String
      value: JSON!
      lastUpdatedAt: String!
      mainImage: SanityImage
      slug: String
      wordCount: Int
      readTime: String
    }
  `);
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;
  await createAllPosts(graphql, createPage);

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

  edges.forEach(({ node }) => {
    createArtworkPostsFromShow(node, createPage);
    createShowIntroductionPosts(node, createPage);
  });
};
