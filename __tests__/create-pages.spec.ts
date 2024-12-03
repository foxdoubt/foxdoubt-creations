import {
  generateArtworkPostPath,
  createArtworkPostContext,
  getWordCount,
} from "../src/util/create-post-context";
import { createShowIntroductionPosts } from "../src/util/create-pages";
import {
  mockPortableText,
  TEXT_BLOCK_WORD_COUNT_TOTAL,
} from "./portable-text.mock";
import CONSTANTS from "../src/util/constants";
import path from "path";

describe("createPages helpers", () => {
  const showSlug = "my-show";
  const slug0 = "test-artwork-0";
  const slug1 = "test-artwork-1";
  const slug2 = "test-artwork-2";

  const path0 = path.join(
    CONSTANTS.artworkCategoryPath,
    showSlug,
    "test-artwork-0"
  );
  const path1 = path.join(
    CONSTANTS.artworkCategoryPath,
    showSlug,
    "test-artwork-1"
  );
  const path2 = path.join(
    CONSTANTS.artworkCategoryPath,
    showSlug,
    "test-artwork-2"
  );

  const allArtworks = [
    {
      slug: {
        current: slug0,
      },
    },
    {
      slug: {
        current: slug1,
      },
    },
    {
      slug: {
        current: slug2,
      },
    },
  ];
  describe("generateArtworkPostPath", () => {
    it("generates a URL path in the format /artwork/<showName>/<artworkPostSlug>", () => {
      expect(generateArtworkPostPath(allArtworks, showSlug, 0)).toEqual(path0);
      expect(generateArtworkPostPath(allArtworks, showSlug, 1)).toEqual(path1);
      expect(generateArtworkPostPath(allArtworks, showSlug, 2)).toEqual(path2);
    });
  });
  describe("createArtworkPostContext", () => {
    it("anticipates correct previous, current and next artwork post URL paths", () => {
      const { objectContaining } = expect;
      const [firstArtwork, secondArtwork, thirdArtwork] = allArtworks;

      expect(
        createArtworkPostContext(firstArtwork, allArtworks, showSlug, 0)
      ).toEqual(
        objectContaining({
          previousArtworkPostPath: path2,
          nextArtworkPostPath: path1,
          slug: { current: { eq: slug0 } },
        })
      );
      expect(
        createArtworkPostContext(secondArtwork, allArtworks, showSlug, 1)
      ).toEqual(
        objectContaining({
          previousArtworkPostPath: path0,
          nextArtworkPostPath: path2,
          slug: { current: { eq: slug1 } },
        })
      );
      expect(
        createArtworkPostContext(thirdArtwork, allArtworks, showSlug, 2)
      ).toEqual(
        objectContaining({
          slug: { current: { eq: slug2 } },
          previousArtworkPostPath: path1,
          nextArtworkPostPath: path0,
        })
      );
    });
  });
  describe("getWordCount", () => {
    it("gets the number of words from portable text block data", () => {
      const result = getWordCount(mockPortableText);
      expect(result).toEqual(TEXT_BLOCK_WORD_COUNT_TOTAL);
    });
    it("does not count white spaces", () => {
      const result1 = getWordCount(mockPortableText);
      expect(result1).toEqual(TEXT_BLOCK_WORD_COUNT_TOTAL);
      const modifiedPortableText = mockPortableText.map((block) => {
        block.children[0].text = block.children[0].text.concat("\n", "\n");
        return block;
      });
      const result2 = getWordCount(modifiedPortableText);
      expect(result2).toEqual(TEXT_BLOCK_WORD_COUNT_TOTAL);
    });
  });
  describe("createShowIntroductionPosts", () => {
    it("calls its createPage arg with correct input when _rawIntroduction is present", () => {
      const mockCreatePage = jest.fn();

      const mockShowName = "My Show";
      let mockShow: Record<string, any> = {
        name: mockShowName,
        _rawIntroduction: mockPortableText,
        slug: { current: showSlug },
        selectedWorks: allArtworks,
      };
      createShowIntroductionPosts(mockShow, mockCreatePage);
      expect(mockCreatePage).toHaveBeenCalledWith({
        path: path.join(
          CONSTANTS.artworkCategoryPath,
          mockShow.slug.current,
          "introduction"
        ),
        component: path.resolve(CONSTANTS.postPath),
        context: {
          value: mockPortableText,
          title: `${mockShowName} Introduction`,
          readTime: 1,
          wordCount: TEXT_BLOCK_WORD_COUNT_TOTAL,
        },
      });
      mockCreatePage.mockClear();
      mockShow = { ...mockShow, _rawIntroduction: undefined };
      createShowIntroductionPosts(mockShow, mockCreatePage);
      expect(mockCreatePage).not.toHaveBeenCalled();
    });
  });
});
