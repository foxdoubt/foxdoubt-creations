import type { GatsbyNode } from "gatsby";
import path from "path";

export const createPages: GatsbyNode["createPages"] = async ({
  graphql,
  actions,
}) => {
  const { data } = await graphql(`
    {
      allSanityArtwork {
        edges {
          node {
            title
            slug {
              current
            }
            medium
            size
            completionYear
            mainImage {
              _key
            }
            body {
              _rawChildren
            }
          }
        }
      }
    }
  `);

  // figure out how to type `data`
  (data as any).allSanityArtwork.edges.forEach((node: any) => {
    const slug = node.slug.current;
    actions.createPage({
      path: slug,
      component: path.resolve(`./src/templates/artwork/artwork.tsx`),
      context: { slug: slug },
    });
  });
};
