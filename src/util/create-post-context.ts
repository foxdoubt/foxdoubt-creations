import { SelectedWorks, Artwork } from "./types";
import path from "path";
import CONSTANTS from "./constants";

import { PortableTextBlock } from "@portabletext/types";

export const joinArtworkPathSegments = (
  work: Artwork | null,
  showSlug: string
) => {
  const postSlug = work?.slug?.current || "";
  return path.join(CONSTANTS.artworkCategoryPath, showSlug, postSlug);
};

export const generateArtworkPostPath = (
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
    previousArtworkPostPath:
      index - 1 < 0
        ? null
        : generateArtworkPostPath(works, showSlug, index - 1),
    nextArtworkPostPath:
      index === works.length - 1
        ? null
        : generateArtworkPostPath(works, showSlug, index + 1),
  };
};

// modified with types from https://www.sanity.io/docs/presenting-block-text#ac67a867dd69
export const portableTextBlocksToPlainText = (
  blocks: PortableTextBlock[] = []
) => {
  return (
    blocks
      // loop through each block
      .map((block) => {
        // if it's not a text block with children,
        // return nothing
        if (block._type !== "block" || !block.children) {
          return "";
        }
        // loop through the children spans, and join the
        // text strings
        return block.children.map((child) => child.text).join("");
      })

      // join the paragraphs leaving split by two linebreaks
      .join("\n\n")
  );
};

export const getWordCount = (blocks: PortableTextBlock[]) => {
  const plainText = portableTextBlocksToPlainText(blocks);
  const wordTokens = plainText.match(/(\b[^\s]+\b)/g);
  return wordTokens && wordTokens.length;
};

export const getReadTime = (wordCount: number | null) => {
  const wordsPerMinute = 238;
  return wordCount && Math.ceil(wordCount / wordsPerMinute);
};

export const createPostContext = ({
  title,
  description,
  author,
  _rawBody,
  _updatedAt,
  mainImage,
  slug,
}: Queries.SanityPost) => {
  const wordCount = _rawBody && getWordCount(_rawBody as any);
  return {
    title,
    description,
    author: author?.name,
    value: _rawBody,
    lastUpdatedAt: _updatedAt,
    mainImage,
    slug: slug?.current,
    wordCount,
    readTime: getReadTime(wordCount),
  };
};
