import * as React from "react";
import Layout from "../shared-components/layout/layout";
import type { HeadFC } from "gatsby";
import { graphql, Link, PageProps } from "gatsby";

export default ({ location }: PageProps<any>) => {
  return (
    <Layout pathname={location.pathname}>
      <>About</>
    </Layout>
  );
};

export const Head: HeadFC = () => <title>About</title>;
