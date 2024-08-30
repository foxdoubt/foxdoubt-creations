import * as React from "react";

const fontNames = [
  "roboto-latin-300-normal",
  "roboto-latin-400-normal",
  "roboto-latin-700-normal",
  "roboto-latin-ext-500-normal",
  "roboto-slab-latin-500-normal",
  "alegreya-sans-latin-400-normal",
  "alegreya-sans-latin-700-normal",
];

export const onRenderBody = ({ setHeadComponents }) => {
  setHeadComponents(
    fontNames.map((name) => (
      <link
        rel="preload"
        href={`/fonts/${name}.woff2`}
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
        key={name}
      />
    ))
  );
};
