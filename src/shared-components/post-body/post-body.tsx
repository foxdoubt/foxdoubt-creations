import * as React from "react";

import {
  PortableText,
  PortableTextBlock,
  PortableTextComponentProps,
  PortableTextMarkComponentProps,
} from "@portabletext/react";

import type { ArbitraryTypedObject } from "@portabletext/types";

const richTextComponents = {
  block: {
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="text-body">{children}</p>
    ),
    h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3>{children}</h3>
    ),
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

export default ({
  value,
  title,
}: {
  value: ArbitraryTypedObject;
  title?: string | null;
}) => {
  return (
    <div className="post-body-outer-container flex-row-center">
      <div className="post-body-inner-container">
        {title && <h2>{title}</h2>}
        <PortableText value={value} components={richTextComponents} />
      </div>
    </div>
  );
};
