import React, { useContext } from 'react';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import styled from 'styled-components';
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale';

import { useStaticQuery, graphql } from 'gatsby';
import Layout from './layout';
import LayoutContext from '../contexts/LayoutContext';
import SEO from './seo';

const ArticleContainer = styled.article`
  max-width: 800px;
  padding: 5px;
  margin: 0 auto;
  font-size: 20px;
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 5rem;
  }
  h2 {
    font-size: 40px;
  }
  h1 {
    font-size: 45px;
  }
  h3 {
    font-size: 30px;
  }
  h4 {
    font-size: 30px;
  }
  p {
    margin-bottom: 2.5rem;
    line-height: 1.5;
  }
  ul {
    list-style-type: disc;
  }

  code {
    font-size: 18px;
  }

  @media only screen and (max-width: ${props =>
      props.isProfileOpen ? '1200px' : '800px'}) {
    max-width: 700px;
  }
  @media only screen and (max-width: ${props =>
      props.isProfileOpen ? '1100px' : '700px'}) {
    max-width: 600px;
  }
  @media only screen and (max-width: ${props =>
      props.isProfileOpen ? '1000px' : '600px'}) {
    max-width: 500px;
  }
  @media only screen and (max-width: ${props =>
      props.isProfileOpen ? '900px' : '500px'}) {
    max-width: 400px;
  }

  @media only screen and (max-width: 400px) {
    max-width: 300px;
  }

  .language-text {
    white-space: normal;
    word-break: break-all;
  }
`;

const ArticleHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 4rem 1rem;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 4rem;
  text-align: center;
  @media (max-width: 500px) {
    font-size: 3rem;
  }
`;

const ArticleInfos = styled.section`
  display: flex;
  justify-content: space-around;
  @media (max-width: ${props => (props.isProfileOpen ? `900px` : `500px`)}) {
    flex-direction: column;
  }
`;

const ArticleInfo = styled.em`
  margin: 0 3rem;
  @media (max-width: ${props => (props.isProfileOpen ? `900px` : `500px`)}) {
    margin: 0.2rem 0;
  }
`;

const Highlight = styled.span`
  color: ${props => props.theme.green};
`;

const ArticleLayout = ({ pageContext }) => {
  const article = useStaticQuery(graphql`
    {
      allMdx {
        nodes {
          id
          frontmatter {
            title
            date
            description
          }
          timeToRead
          body
        }
      }
    }
  `).allMdx.nodes.find(node => {
    console.log({ node, pageContext });
    return node.id === pageContext.article.id;
  });

  const { body, frontmatter, timeToRead } = article;
  const { title, date, description } = frontmatter;
  const { isProfileOpen } = useContext(LayoutContext);
  console.log({
    pageContext,
  });
  return (
    <Layout>
      <SEO title={title} description={description} />
      <ArticleHeader>
        <Title>{title}</Title>
        <ArticleInfos isProfileOpen={isProfileOpen}>
          <ArticleInfo isProfileOpen={isProfileOpen}>
            Temps de lecture: <Highlight>{timeToRead} minutes</Highlight>
          </ArticleInfo>
          <ArticleInfo>
            Il y a:{' '}
            <Highlight>
              {formatDistanceToNow(new Date(date), { locale: fr })}
            </Highlight>
          </ArticleInfo>
        </ArticleInfos>
      </ArticleHeader>
      <ArticleContainer isProfileOpen={isProfileOpen}>
        <MDXRenderer>{body}</MDXRenderer>
      </ArticleContainer>
    </Layout>
  );
};

export default ArticleLayout;
