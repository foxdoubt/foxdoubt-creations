import { isNaN } from "lodash";

export type ShowQueryEdges = Queries.GetAllShowsQuery["allSanityShow"]["edges"];
export type SelectedWorks = ShowQueryEdges[0]["node"]["selectedWorks"];
type Artwork = { readonly slug: { readonly current: string | null } | null };

export const getPreviousSlug = (
  allWorks: SelectedWorks,
  showSlug: string,
  index: number
) => {
  const prevWork = allWorks ? allWorks[index] : null;
  return prevWork && getArtworkPostPath(prevWork!, showSlug);
};

export const getNextSlug = (
  allWorks: SelectedWorks,
  showSlug: string,
  index: number
) => {
  const nextWork = allWorks ? allWorks[index] : null;
  return nextWork && getArtworkPostPath(nextWork, showSlug);
};

export const getArtworkPostPath = (work: Artwork, showSlug: string) =>
  `/artwork/${showSlug}/${work.slug?.current}`;

export const createArtworkPostContext = (
  artwork: Artwork,
  allArtworks: SelectedWorks,
  showSlug: string,
  index: number
) => {
  const works = allArtworks || [];
  return {
    slug: { current: { eq: artwork.slug?.current } },
    currentSlug: getArtworkPostPath(artwork, showSlug),
    previousSlug: isNaN(index - 1)
      ? null
      : getPreviousSlug(works, showSlug, index - 1),
    nextSlug:
      index > works.length - 1 ? null : getNextSlug(works, showSlug, index + 1),
  };
};
