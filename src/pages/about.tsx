import * as React from "react";
import Layout from "../shared-components/layout/layout";
import { graphql, Link, PageProps } from "gatsby";

export default ({ location }: PageProps<any>) => {
  return (
    <Layout pathname={location.pathname}>
      <>About</>
    </Layout>
  );
};
