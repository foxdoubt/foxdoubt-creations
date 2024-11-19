import { PageProps } from "gatsby";
import { isNull, isUndefined, isNaN } from "lodash";

export type ShowQueryEdges =
  PageProps<Queries.GetAllShowsQuery>["data"]["allSanityShow"]["edges"];

export type SelectedWorks = ShowQueryEdges[0]["node"]["selectedWorks"];

type Artwork = { readonly slug: { readonly current: string | null } | null };

export const getPreviousSlug = (
  allWorks: SelectedWorks,
  showName: string,
  index: number
) => {
  const prevWork = allWorks ? allWorks[index] : null;
  return prevWork && getSlug(prevWork!, showName);
};

export const getNextSlug = (
  allWorks: SelectedWorks,
  showName: string,
  index: number
) => {
  const nextWork = allWorks ? allWorks[index] : null;

  return nextWork && getSlug(nextWork, showName);
};

const getSlug = (work: Artwork, showName: string) =>
  `/artwork/${showName}/${work.slug?.current}`;

export const createArtworkPageContext = (
  artwork: Artwork,
  allArtworks: SelectedWorks,
  showName: string,
  index: number
) => {
  const works = allArtworks || [];
  return {
    slug: { current: { eq: artwork.slug?.current } },
    // `currentSlug` is a workaround to avoid TypeGen error on SanitySlugFilterInput
    // error: `The type of SitePageContext.slug must be Output Type but got: SanitySlugFilterInput`
    currentSlug: getSlug(artwork, showName),
    previousSlug: isNaN(index - 1)
      ? null
      : getPreviousSlug(works, showName, index - 1),
    nextSlug:
      index > works.length - 1 ? null : getNextSlug(works, showName, index + 1),
  };
};
