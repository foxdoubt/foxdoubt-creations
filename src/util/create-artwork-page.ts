import { PageProps } from "gatsby";
import { isNull, isUndefined, isNaN } from "lodash";

export type ShowQueryEdges =
  PageProps<Queries.GetAllShowsQuery>["data"]["allSanityShow"]["edges"];

export type SelectedWorks = ShowQueryEdges[0]["node"]["selectedWorks"];

type Artwork = { readonly slug: { readonly current: string | null } | null };

export const getPreviousSlug = (
  allWorks: SelectedWorks,
  showSlug: string,
  index: number
) => {
  const prevWork = allWorks ? allWorks[index] : null;
  return prevWork && getSlug(prevWork!, showSlug);
};

export const getNextSlug = (
  allWorks: SelectedWorks,
  showSlug: string,
  index: number
) => {
  const nextWork = allWorks ? allWorks[index] : null;

  return nextWork && getSlug(nextWork, showSlug);
};

const getSlug = (work: Artwork, showSlug: string) =>
  `/artwork/${showSlug}/${work.slug?.current}`;

export const createArtworkPageContext = (
  artwork: Artwork,
  allArtworks: SelectedWorks,
  showSlug: string,
  index: number
) => {
  const works = allArtworks || [];
  return {
    slug: { current: { eq: artwork.slug?.current } },
    currentSlug: getSlug(artwork, showSlug),
    previousSlug: isNaN(index - 1)
      ? null
      : getPreviousSlug(works, showSlug, index - 1),
    nextSlug:
      index > works.length - 1 ? null : getNextSlug(works, showSlug, index + 1),
  };
};
