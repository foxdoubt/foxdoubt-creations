import * as React from "react";
import { PageProps } from "gatsby";
import Layout from "../../shared-components/layout/layout";
import PostBody from "../../shared-components/post-body/post-body";
import type { ArbitraryTypedObject } from "@portabletext/types";

export default ({
  pageContext,
  location,
}: PageProps<any, Queries.PostContext>) => {
  return (
    <Layout pathname={location.pathname}>
      <PostBody
        value={pageContext.value as ArbitraryTypedObject}
        title={pageContext.title}
      />
    </Layout>
  );
};
