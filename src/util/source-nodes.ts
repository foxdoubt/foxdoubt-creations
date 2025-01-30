import Parser from "rss-parser";
import appConfig from "../../app-config";
import type { SourceNodesArgs } from "gatsby";

// based on gatsbyjs.com/plugins/gatsby-source-podcast-rss-feed
export const sourcePodcastNodes = async (
  podcastName: string,
  sourceNodeArgs: SourceNodesArgs
) => {
  const {
    actions: { createNode },
    createNodeId,
    createContentDigest,
  } = sourceNodeArgs;
  const rssParser = new Parser({
    customFields: {
      item: ["description", "slug"],
    },
  });
  const rssFeedUrl = `${appConfig.sanityRssServerUrl}/${appConfig.sanityProjectId}/${appConfig.sanityDataset}/${podcastName}/rss`;
  const rssFeed = await rssParser.parseURL(rssFeedUrl);
  rssFeed.items.forEach((item) => {
    console.log({ item });
    const nodeId = item["guid"];
    const type = `podcastRssFeedEpisode`;

    createNode({
      item,
      id: createNodeId(`${type}${nodeId}`),
      parent: null,
      children: [],
      internal: {
        contentDigest: createContentDigest(item),
        type,
        description: item.description,
      },
    });
  });
};
