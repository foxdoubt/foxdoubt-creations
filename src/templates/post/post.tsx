import * as React from "react";
import { PageProps } from "gatsby";
import Layout from "../../shared-components/layout/layout";
import PostBody from "../../shared-components/post-body/post-body";

export default ({ pageContext, location }: PageProps<any>) => {
  return (
    <Layout pathname={location.pathname}>
      <PostBody value={pageContext.postJSON} title={pageContext.title} />
    </Layout>
  );
};
