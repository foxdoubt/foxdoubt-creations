import { generateArtworkPostPath } from "../src/util/create-artwork-post-context";
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

  const allNodes = [
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
      expect(generateArtworkPostPath(allNodes, showSlug, 0)).toEqual(path0);
      expect(generateArtworkPostPath(allNodes, showSlug, 1)).toEqual(path1);
      expect(generateArtworkPostPath(allNodes, showSlug, 2)).toEqual(path2);
    });
  });
});
