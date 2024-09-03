import * as React from "react";
import { PageProps } from "gatsby";

// todo: write a GraphQL query that uses current slug to query
// all specific artwork data from Sanity
// todo: figure out how to type the pageContext
const Artwork = (props: PageProps) => {
  const {
    node: { title, medium, size, completionYear },
  } = props.pageContext;

  return (
    <div className="artwork-template-container">
      <div className="flex-column-center artwork-label">
        <h3 className="artwork-title">{title}</h3>
        <p className="artwork-description">{[medium, size].join(", ")}</p>
        <p className="artwork-year">{completionYear}</p>
      </div>
    </div>
  );
};

export default Artwork;
