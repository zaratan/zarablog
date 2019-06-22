import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link, useStaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import slugify from 'slugify';

import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import Layout from '../components/layout';
import SEO from '../components/seo';
import LayoutContext from '../contexts/LayoutContext';

const Magenta = styled.span`
  color: ${props => props.theme.magenta};
`;

const Cyan = styled.span`
  color: ${props => props.theme.cyan};
`;

const Yellow = styled.span`
  color: ${props => props.theme.yellow};
`;

const Tag = ({ children, type, tags }) => {
  const { isProfileOpen } = useContext(LayoutContext);
  return (
    <IndentSpan isProfileOpen={isProfileOpen}>
      <TagSpan isProfileOpen={isProfileOpen}>
        {'<'}
        <Magenta>{`${type}${tags.length > 0 ? ' ' : ''}`}</Magenta>
        {tags.map(tag => {
          const [k, v] = tag;
          return (
            <span key={k}>
              <Cyan>{k}</Cyan>=<Yellow>"{v}"</Yellow>
            </span>
          );
        })}
        {'>'}
      </TagSpan>
      <ContentSpan isProfileOpen={isProfileOpen}>{children}</ContentSpan>
      <TagSpan isProfileOpen={isProfileOpen}>
        {'</'}
        <Magenta>{type}</Magenta>
        {'>'}
      </TagSpan>
    </IndentSpan>
  );
};

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  tags: PropTypes.array,
};

Tag.defaultProps = {
  tags: [],
};

const DateHtml = ({ children }) => (
  <Tag type="p" tags={[['class', 'date']]}>
    {children}
  </Tag>
);

DateHtml.propTypes = {
  children: PropTypes.node.isRequired,
};

const TitleHtml = ({ children }) => <Tag type="title">{children}</Tag>;

TitleHtml.propTypes = {
  children: PropTypes.node.isRequired,
};

const IndentSpan = styled.span`
  color: ${props => props.theme.base1};
  padding-left: 20px;
  min-width: 350px;
  @media only screen and (max-width: ${props =>
      props.isProfileOpen ? '1100px' : '700px'}) {
    display: block;
  }
`;

const TagSpan = styled.span`
  @media only screen and (max-width: ${props =>
      props.isProfileOpen ? '1100px' : '700px'}) {
    display: block;
  }
`;

const ContentSpan = styled.span`
  @media only screen and (max-width: ${props =>
      props.isProfileOpen ? '1100px' : '700px'}) {
    display: block;
    padding-left: 20px;
  }
`;

const TitleList = styled.ul`
  margin: 50px 20px 20px 20px;
`;

const TitleItem = styled(Link)`
  display: flex;
  transition: padding 0.2s ease-in-out;
  color: ${props => props.theme.base1};
  font-size: 20px;
  :hover {
    padding-left: 20px;
    color: ${props => props.theme.base1};
  }
  :focus {
    padding-left: 20px;
    color: ${props => props.theme.base1};
  }
  font-family: Inconsolata;
  @media only screen and (max-width: ${props =>
      props.isProfileOpen ? `1310px` : `910px`}) {
    flex-direction: column;
  }
`;

const Index = () => {
  const { isProfileOpen } = useContext(LayoutContext);
  const { nodes } = useStaticQuery(graphql`
    {
      allMdx(sort: { fields: frontmatter___date, order: DESC }) {
        nodes {
          frontmatter {
            title
            date
          }
          id
        }
      }
    }
  `).allMdx;

  console.log({ nodes });

  return (
    <>
      <SEO title="Home" />
      <TitleList>
        {nodes.map(({ frontmatter, id }) => (
          <li key={id}>
            <TitleItem
              to={slugify(frontmatter.title.toLowerCase())}
              isProfileOpen={isProfileOpen}
            >
              <DateHtml isProfileOpen={isProfileOpen}>
                {format(new Date(frontmatter.date), 'd MMM yyyy', {
                  locale: fr,
                })}
              </DateHtml>
              <TitleHtml isProfileOpen={isProfileOpen}>
                {frontmatter.title}
              </TitleHtml>
            </TitleItem>
          </li>
        ))}
      </TitleList>
    </>
  );
};

const IndexPage = () => (
  <Layout>
    <Index />
  </Layout>
);

export default IndexPage;
