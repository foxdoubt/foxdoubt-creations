import * as React from "react";

import {
  PortableText,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
  PortableTextReactComponents,
} from "@portabletext/react";

import { PortableTextBlock, ArbitraryTypedObject } from "@portabletext/types";

const richTextComponents: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({
      value,
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => {
      const classNames =
        value.children.length === 1 && value.children[0].text === ""
          ? "line-break"
          : "paragraph";
      return <p className={classNames}>{children}</p>;
    },
    h2: ({ children }) => <h3>{children}</h3>,
    blockquote: ({
      children,
    }: PortableTextComponentProps<PortableTextBlock>) => (
      <blockquote className="font-secondary">{children}</blockquote>
    ),
  },
  marks: {
    strong: ({ children }: PortableTextMarkComponentProps) => (
      <span className="font-bold">{children}</span>
    ),
  },
};

export default ({ value }: { value: ArbitraryTypedObject }) => {
  return <PortableText value={value} components={richTextComponents} />;
};
