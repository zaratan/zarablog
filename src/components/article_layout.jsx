import React from 'react';
import { MDXRenderer } from 'gatsby-mdx';
import Layout from './layout';

const ArticleLayout = ({ pageContext }) => {
  const { article } = pageContext;
  return (
    <Layout>
      <>
        <MDXRenderer>{article.code.body}</MDXRenderer>
      </>
    </Layout>
  );
};

export default ArticleLayout;
