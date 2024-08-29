import React from "react";
import { graphql } from "gatsby";
import Img from "gatsby-image";

export default ({ data }) => {
  console.log({ imageData: data });
  //   return <Img fixed={data.file.childImageSharp.fixed} />;
  return <></>;
};

export const query = graphql`
  query {
    file(relativePath: { eq: "src/images/tavis-beck-fox-unsplash.jpg" }) {
      childImageSharp {
        fixed(width: 125, height: 125) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`;
