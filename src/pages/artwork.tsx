import * as React from "react";
import Layout from "../shared-components/layout/layout";
import { graphql } from "gatsby";

export default ({ data }: any) => {
  return (
    <Layout>
      {data.allSanityShow.edges.map(({ node }: any) => {
        return (
          <>
            <h3>{node.name}</h3>
            {node.included_works.map((work: any) => (
              <p>{work.title}</p>
            ))}
          </>
        );
      })}
    </Layout>
  );
};

export const query = graphql`
  query GetAllShows {
  allSanityShow {
    edges {
      node {
        name
        included_works {
          title
          mainImage {
            asset {
              url
            }
          }
        }
        category {
          title
        }
      }
    }
  }
}
`;
