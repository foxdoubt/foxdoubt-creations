import type { GatsbyConfig } from "gatsby";
import appConfig from "./app-config";

const config: GatsbyConfig = {
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
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    "gatsby-plugin-sass",
    // {
    //   resolve: "gatsby-plugin-google-gtag",
    //   options: {
    //     trackingIds: ["1234"],
    //   },
    // },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
  ],
};

export default config;
