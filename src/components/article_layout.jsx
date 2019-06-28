import React from 'react';
import { MDXRenderer } from 'gatsby-mdx';
import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

import Layout from './layout';

const ArticleContainer = styled.article``;

const ArticleHeader = styled.header`
  display: flex;
  flex-direction: column;
`;

const ArticleLayout = ({ pageContext }) => {
  const { article } = pageContext;
  const { title, date } = article.frontmatter;
  console.log({
    pageContext,
  });
  return (
    <Layout>
      <ArticleHeader>
        <h1>{title}</h1>
        <span>
          Il y a {formatDistanceToNow(new Date(date), { locale: fr })}
        </span>
      </ArticleHeader>
      <ArticleContainer>
        <MDXRenderer>{article.code.body}</MDXRenderer>
      </ArticleContainer>
    </Layout>
  );
};

export default ArticleLayout;
