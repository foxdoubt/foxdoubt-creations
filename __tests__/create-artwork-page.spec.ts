import { getPreviousSlug, getNextSlug } from "../src/util/create-artwork-page";

describe("createPages helpers", () => {
  const slugAtIndex0 = "/artwork/test-artwork";
  const slugAtIndex1 = "/artwork/test-artwork-2";
  const slugAtIndex2 = "/artwork/test-artwork-3";
  const allNodes = [
    {
      node: {
        slug: {
          current: slugAtIndex0,
        },
      },
    },
    {
      node: {
        slug: {
          current: slugAtIndex1,
        },
      },
    },
    {
      node: {
        slug: {
          current: slugAtIndex2,
        },
      },
    },
  ];
  describe("getPreviousSlug", () => {
    it("returns the previous slug in a list, if it exists", () => {
      expect(getPreviousSlug(allNodes, 0)).toBeNull();
      expect(getPreviousSlug(allNodes, 1)).toEqual(slugAtIndex0);
      expect(getPreviousSlug(allNodes, 2)).toEqual(slugAtIndex1);
    });
  });
  describe("getNextSlug", () => {
    it.only("returns the previous slug in a list, if it exists", () => {
      expect(getNextSlug(allNodes, 2)).toBeNull();
      expect(getNextSlug(allNodes, 0)).toEqual(slugAtIndex1);
      expect(getNextSlug(allNodes, 1)).toEqual(slugAtIndex2);
    });
  });
});
