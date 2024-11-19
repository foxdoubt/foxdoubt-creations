import * as React from "react";
import Layout from "../shared-components/layout/layout";
import { graphql, Link, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";

export default ({
  data,
  location,
}: PageProps<Queries.GetAllShowsForArtworkIndexQuery>) => {
  return (
    <Layout pathname={location.pathname}>
      <div className="all-shows-outer-container">
        <div className="all-shows-inner-container">
          {data.allSanityShow.edges.map(({ node }) => {
            return (
              <div className="show-preview-outer-container">
                <h3>{node.name}</h3>
                <Link to={`/artwork/${node.slug?.current}/introduction`}>
                  <h3>Show Introduction</h3>
                </Link>
                <div className="show-preview-inner-container">
                  {(node.selectedWorks || []).map((work) => (
                    <Link
                      to={`${node.name}/${work?.slug?.current}`}
                      className="artwork-thumbnail"
                    >
                      {work?.mainImage?.asset?.gatsbyImageData && (
                        <GatsbyImage
                          image={work?.mainImage?.asset?.gatsbyImageData}
                          alt={work.title || "unavailable"}
                        />
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query GetAllShowsForArtworkIndex {
    allSanityShow(sort: {selectedWorks: {publishedAt: ASC}}) {
      edges {
        node {
          name
          slug {
            current
          }
          selectedWorks {
            title
            publishedAt
            completionYear
            slug {
              current
            }
            mainImage {
              asset {
                gatsbyImageData(height:125, width:125)
              }
            }
          }
        }
      }
    }
  }`;
