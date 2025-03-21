import type { GatsbyConfig } from "gatsby";
import appConfig from "./app-config";
import netlifyAdapter from "gatsby-adapter-netlify";

const config: GatsbyConfig = {
  adapter: netlifyAdapter(),
  siteMetadata: {
    title: `foxdoubt-blogcast`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: "gatsby-source-sanity",
      options: {
        token: appConfig.sanityToken,
        projectId: appConfig.sanityProjectId,
        dataset: appConfig.sanityDataset,
      },
    },

    {
      resolve: "gatsby-plugin-webpack-bundle-analyser-v2",
      options: {
        devMode: false,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/fox.svg",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images/`,
      },
      __key: "images",
    },
  ],
};

export default config;
