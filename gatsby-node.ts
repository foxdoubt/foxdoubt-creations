import type { CreateSchemaCustomizationArgs, GatsbyNode } from "gatsby";

import {
  createArtworkPostsFromShow,
  createShowIntroductionPosts,
  createAllPosts,
  getAllShows,
} from "./src/util/create-pages";

export const createSchemaCustomization = ({
  actions,
}: CreateSchemaCustomizationArgs) => {
  const { createTypes } = actions;

  createTypes(`
    type ArtworkTemplateContext {
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
      mainImageCaption: String
    }
  `);
};

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { createPage } = actions;
  await createAllPosts(graphql, createPage);

  const { data: showsData, errors: showsErrors } = await getAllShows(graphql);

  if (showsErrors) {
    throw showsErrors;
  }
  const edges = showsData?.allSanityShow.edges || [];

  edges.forEach(({ node }) => {
    createArtworkPostsFromShow(node, createPage);
    createShowIntroductionPosts(node, createPage);
  });
};
