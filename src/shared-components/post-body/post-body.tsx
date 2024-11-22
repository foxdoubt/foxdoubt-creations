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
