import { PageProps } from "gatsby";
import { isNull, isUndefined } from "lodash";

export type ShowQueryEdges =
  PageProps<Queries.GetAllShowsQuery>["data"]["allSanityShow"]["edges"];

export type SelectedWork = Pick<
  PageProps<Queries.SanityArtwork>["data"],
  "slug"
>;

export const getPreviousSlug = (
  allWorks: SelectedWork[],
  showName: string,
  index: number
) => {
  const prevIndex = index > 0 ? index - 1 : null;
  if (!isNull(prevIndex) && !isUndefined(allWorks[prevIndex].slug?.current)) {
    return `${showName}/${allWorks[prevIndex].slug?.current}`;
  }
  return null;
};

export const getNextSlug = (
  allWorks: SelectedWork[],
  showName: string,
  index: number
) => {
  const nextIndex = index < allWorks.length - 1 ? index + 1 : null;
  console.log("getNextSlug: nextIndex: ", nextIndex);
  if (!isNull(nextIndex) && !isUndefined(allWorks[nextIndex].slug?.current)) {
    return `${showName}/${allWorks[nextIndex].slug?.current}`;
  }
  return null;
};

export const createArtworkPageContext = (
  artwork: SelectedWork,
  allArtworks: SelectedWork[],
  showName: string,
  index: number
) => {
  const currentSlug = artwork.slug?.current;
  return {
    slug: { current: { eq: currentSlug } },
    // `currentSlug` is a workaround to avoid TypeGen error on SanitySlugFilterInput
    // error: `The type of SitePageContext.slug must be Output Type but got: SanitySlugFilterInput`
    currentSlug,
    previousSlug: getPreviousSlug(allArtworks, showName, index),
    nextSlug: getNextSlug(allArtworks, showName, index),
  };
};

export const CreateArtworkPageContext = `
  type SitePageContext {
    currentSlug: String!
    previousSlug: String!
    nextSlug: String!
  }
`;
