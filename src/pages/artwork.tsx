import * as React from "react";
import Layout from "../shared-components/layout/layout";
import { graphql, Link } from "gatsby";

export default (props: any) => {
  console.log("data: ", props.data);
  return (
    <Layout>
      {props.data.allSanityShow.edges.map(({ node }: any) => {
        return (
          <>
            <h3>{node.name}</h3>
            {node.selectedWorks.map((work) => (
              <Link to={`${node.name}/${work.slug.current}`}>
                <p>{work.slug.current}</p>
              </Link>
            ))}
          </>
        );
      })}
    </Layout>
  );
};

export const query = graphql`
  query GetAllShows {
      allSanityShow(sort: {selectedWorks: {publishedAt: ASC}}) {
        edges {
          node {
            name
            selectedWorks {
              slug {
                current
              }
            }
          }
        }
      }
    }
`;