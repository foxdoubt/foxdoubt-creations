import * as React from "react";
import Layout from "../shared-components/layout/layout";
import { graphql, Link, PageProps } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import CONSTANTS from "../util/constants";
import orderBy from "lodash/orderBy";

const ArtworkPage = ({
  data,
  location,
}: PageProps<Queries.GetAllShowsForArtworkIndexQuery>) => {
  return (
    <Layout pathname={location.pathname}>
      <div className="all-shows-outer-container">
        <div className="all-shows-inner-container">
          {data.allSanityShow.edges.map(({ node }, i) => {
            const showSlug = node.slug?.current;
            const showKey = `${i}-${showSlug}-show`;
            const dateOrderedSelectedWorks = orderBy(
              node.selectedWorks,
              ["completionYear"],
              ["desc"]
            );

            return (
              <div className="show-preview-outer-container" key={showKey}>
                <h3 className="show-name">{node.name}</h3>
                <Link
                  to={`/artwork/${showSlug}/introduction`}
                  state={{
                    nextStepsLinkPath: CONSTANTS.artworkCategoryPath,
                    nextStepLinkText: "Back to show page",
                  }}
                >
                  <h3 className="show-introduction">Read Introduction</h3>
                </Link>
                <div className="show-preview-inner-container">
                  {(dateOrderedSelectedWorks || []).map((work, i) => {
                    const workSlug = work?.slug?.current;
                    const selectedWorkKey = `${i}-${workSlug}-selected-work`;
                    return (
                      <Link
                        to={`${node.slug?.current}/${workSlug}`}
                        className="artwork-thumbnail"
                        key={selectedWorkKey}
                      >
                        {work?.mainImage?.asset?.gatsbyImageData && (
                          <GatsbyImage
                            image={work?.mainImage?.asset?.gatsbyImageData}
                            alt={work.title || "unavailable"}
                          />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default ArtworkPage;

export const query = graphql`
  query GetAllShowsForArtworkIndex {
    allSanityShow {
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
