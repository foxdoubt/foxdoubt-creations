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
