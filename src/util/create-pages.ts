import { Actions, CreatePagesArgs } from "gatsby";
import path from "path";
import {
  joinArtworkPathSegments,
  createArtworkPostContext,
  createPostContext,
  getWordCount,
} from "./create-post-context";
import CONSTANTS from "./constants";

type ShowNode = Queries.GetAllShowsQuery["allSanityShow"]["edges"][0]["node"];

export const createArtworkPostsFromShow = (
  node: ShowNode,
  createPage: Actions["createPage"]
) => {
  const showSlug = node.slug?.current || CONSTANTS.missingShowSlugValue;
  node.selectedWorks?.forEach((work, index) => {
    if (work && work.slug?.current) {
      const artworkPostContext = createArtworkPostContext(
        work,
        node.selectedWorks,
        showSlug,
        index
      );
      createPage({
        path: joinArtworkPathSegments(work, showSlug),
        component: path.resolve(CONSTANTS.artworkTemplatePath),
        context: artworkPostContext,
      });
    }
  });
};

export const createShowIntroductionPosts = (
  node: ShowNode,
  createPage: Actions["createPage"]
) => {
  if (node._rawIntroduction) {
    const wordsPerMinute = 238;
    const wordCount = getWordCount(node._rawIntroduction as any);
    const readTime = wordCount && Math.ceil(wordCount / wordsPerMinute);

    const showTitle = `${node.name || CONSTANTS.fallbackShowName} Introduction`;
    const introductionPostPath = path.join(
      CONSTANTS.artworkCategoryPath,
      node.slug?.current || CONSTANTS.missingShowSlugValue,
      "introduction"
    );

    createPage({
      path: introductionPostPath,
      component: path.resolve(CONSTANTS.postPath),
      context: {
        value: node._rawIntroduction,
        title: showTitle,
        wordCount,
        readTime,
        author: node.author?.name,
        lastUpdatedAt: node._updatedAt,
      },
    });
  }
};

export const createAllPosts = async (
  graphql: CreatePagesArgs["graphql"],
  createPage: Actions["createPage"]
) => {
  const { data, errors } = await graphql<{
    allSanityPost: Queries.SanityPostConnection;
  }>(`
    query GetAllPosts {
      allSanityPost {
        edges {
          node {
            title
            _updatedAt(formatString: "MMMM D, YYYY")
            description
            mainImage {
              asset {
                gatsbyImageData(height: 500)
                altText
              }
            }
            slug {
              current
            }
            _rawBody
          }
        }
      }
    }`);

  if (errors) throw errors;

  (data?.allSanityPost.edges || []).forEach(({ node }) => {
    createPage({
      path: path.join("posts", node.slug?.current),
      component: path.resolve(CONSTANTS.postPath),
      context: createPostContext(node),
    });
  });
};
