import { isNaN, isNil } from "lodash";
import { SelectedWorks, Artwork } from "./types";
import path from "path";
import CONSTANTS from "./constants";

export const joinArtworkPathSegments = (
  work: Artwork | null,
  showSlug: string
) => {
  const postSlug = work?.slug?.current || "";
  return path.join(CONSTANTS.artworkCategoryPath, showSlug, postSlug);
};

const generateArtworkPostPath = (
  allWorks: SelectedWorks,
  showSlug: string,
  index: number
) => {
  const artwork = allWorks ? allWorks[index] : null;
  return joinArtworkPathSegments(artwork, showSlug);
};

export const createArtworkPostContext = (
  artwork: Artwork,
  allArtworks: SelectedWorks,
  showSlug: string,
  index: number
) => {
  const works = allArtworks || [];
  return {
    slug: { current: { eq: artwork.slug?.current } },
    currentArtworkPostPath: joinArtworkPathSegments(artwork, showSlug),
    previousArtworkPostPath: isNaN(index - 1)
      ? null
      : generateArtworkPostPath(works, showSlug, index - 1),
    nextArtworkPostPath:
      index > works.length - 1
        ? null
        : generateArtworkPostPath(works, showSlug, index + 1),
  };
};
