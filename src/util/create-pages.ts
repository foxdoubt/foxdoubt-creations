import { Actions } from "gatsby";
import path from "path";
import {
  joinArtworkPathSegments,
  createArtworkPostContext,
  portableTextBlocksToPlainText,
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
    const wordsPerMinute = 200;
    const introductionPlainText = portableTextBlocksToPlainText(
      node._rawIntroduction as any
    );
    const wordTokens = introductionPlainText.split(/\w+/g).filter(Boolean);
    const wordCount = wordTokens.length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    console.log("src/util/create-pages.ts: ", {
      wordTokens,
      wordCount,
      readTime,
    });

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
      },
    });
  }
};
