import { faker } from "@faker-js/faker";

const portableTextInput = [
  {
    _key: faker.string.alpha(12),
    _type: "block",
    children: [
      {
        _key: faker.string.alpha(12),
        _type: "span",
        marks: [],
        text: "foo foo foo",
      },
    ],
    markDefs: [],
    style: "normal",
  },
  {
    _key: faker.string.alpha(12),
    _type: "block",
    children: [
      {
        _key: faker.string.alpha(12),
        _type: "span",
        marks: [],
        text: "foo foo foo",
      },
    ],
    markDefs: [],
    style: "normal",
  },
  {
    _key: faker.string.alpha(12),
    _type: "block",
    children: [
      {
        _key: faker.string.alpha(12),
        _type: "span",
        marks: [],
        text: "foo foo foo",
      },
    ],
  },
];

export const TEXT_BLOCK_WORD_COUNT_TOTAL = 60;
export const wordsPerBlock =
  TEXT_BLOCK_WORD_COUNT_TOTAL / portableTextInput.length;

export const mockPortableText = portableTextInput.map((block) => {
  block.children[0].text = faker.word.words(wordsPerBlock);
  return block;
});
