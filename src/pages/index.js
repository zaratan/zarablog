import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import SEO from '../components/seo';

const Magenta = styled.span`
  color: ${props => props.theme.magenta};
`;

const Cyan = styled.span`
  color: ${props => props.theme.cyan};
`;

const Yellow = styled.span`
  color: ${props => props.theme.yellow};
`;

const Tag = ({ children, type, tags, isProfileOpen }) => (
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

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  tags: PropTypes.array,
  isProfileOpen: PropTypes.bool.isRequired,
};

Tag.defaultProps = {
  tags: [],
};

const DateHtml = ({ children, isProfileOpen }) => (
  <Tag type="p" isProfileOpen={isProfileOpen} tags={[['class', 'date']]}>
    {children}
  </Tag>
);

DateHtml.propTypes = {
  children: PropTypes.node.isRequired,
  isProfileOpen: PropTypes.bool.isRequired,
};

const TitleHtml = ({ children, isProfileOpen }) => (
  <Tag type="title" isProfileOpen={isProfileOpen}>
    {children}
  </Tag>
);

TitleHtml.propTypes = {
  children: PropTypes.node.isRequired,
  isProfileOpen: PropTypes.bool.isRequired,
};

const IndentSpan = styled.span`
  color: ${props => props.theme.base1};
  margin-left: 20px;
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
    margin-left: 20px;
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
      props.isProfileOpen ? `1300px` : `900px`}) {
    flex-direction: column;
  }
`;

const Index = ({ isProfileOpen }) => (
  <>
    <SEO title="Home" />
    <TitleList>
      <li>
        <TitleItem to="/" isProfileOpen={isProfileOpen}>
          <DateHtml isProfileOpen={isProfileOpen}>03 Fev 2019</DateHtml>
          <TitleHtml isProfileOpen={isProfileOpen}>
            Réduire ses controlleurs et modèles
          </TitleHtml>
        </TitleItem>
      </li>
    </TitleList>
  </>
);

Index.propTypes = {
  isProfileOpen: PropTypes.bool,
};

Index.defaultProps = {
  isProfileOpen: false,
};

const IndexPage = () => (
  <Layout>
    <Index />
  </Layout>
);

export default IndexPage;
