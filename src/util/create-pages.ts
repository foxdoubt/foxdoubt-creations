import { Actions } from "gatsby";
import path from "path";
import {
  getArtworkPostPath,
  createArtworkPostContext,
} from "./create-artwork-post-context";
import CONSTANTS from "./constants";

type ShowNode = Queries.GetAllShowsQuery["allSanityShow"]["edges"][0]["node"];

export const createArtworkPostsFromShow = (
  node: ShowNode,
  actions: Actions
) => {
  const { createPage } = actions;
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
        path: getArtworkPostPath(work, showSlug),
        component: path.resolve(CONSTANTS.artworkTemplatePath),
        context: artworkPostContext,
      });
    }
  });
};

export const createShowIntroductionPosts = (
  node: ShowNode,
  actions: Actions
) => {
  const { createPage } = actions;
  if (node._rawIntroduction) {
    const introductionPostPath = `/artwork/${
      node.slug?.current || CONSTANTS.missingShowSlugValue
    }/introduction`;
    createPage({
      path: introductionPostPath,
      component: path.resolve(CONSTANTS.postPath),
      context: {
        value: node._rawIntroduction,
        title: `${node.name || "Show"} Introduction`,
      },
    });
  }
};
