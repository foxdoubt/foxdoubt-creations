import { PageProps } from "gatsby";
import { isNull, isUndefined } from "lodash";

export type ArtworkQueryEdges =
  PageProps<Queries.GetAllArtworkQuery>["data"]["allSanityArtwork"]["edges"];

export const getPreviousSlug = (allNodes: ArtworkQueryEdges, index: number) => {
  const prevIndex = index > 0 ? index - 1 : null;
  if (
    !isNull(prevIndex) &&
    !isUndefined(allNodes[prevIndex].node.slug?.current)
  ) {
    return allNodes[prevIndex].node.slug?.current;
  }
  return null;
};

export const getNextSlug = (allNodes: ArtworkQueryEdges, index: number) => {
  const nextIndex = index < allNodes.length - 1 ? index + 1 : null;
  if (
    !isNull(nextIndex) &&
    !isUndefined(allNodes[nextIndex].node.slug?.current)
  ) {
    return allNodes[nextIndex].node.slug?.current;
  }
  return null;
};

export const createArtworkPageContext = (
  node: ArtworkQueryEdges[0]["node"],
  allNodes: ArtworkQueryEdges,
  index: number
) => {
  const currentSlug = node.slug!.current;
  return {
    slug: { current: { eq: currentSlug } },
    // `currentSlug` is a workaround to avoid TypeGen error on SanitySlugFilterInput
    // error: `The type of SitePageContext.slug must be Output Type but got: SanitySlugFilterInput`
    currentSlug,
    previousSlug: getPreviousSlug(allNodes, index),
    nextSlug: getNextSlug(allNodes, index),
  };
};

export const CreateArtworkPageContext = `
  type SitePageContext {
    currentSlug: String!
    previousSlug: String!
    nextSlug: String!
  }
`;
