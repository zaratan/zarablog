import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/layout';
import Image from '../components/image';
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

const Tag = ({ children, type, tags, first }) => (
  <IndentSpan>
    {'<'}
    <Magenta>{`${type}${tags.length > 0 ? ' ' : ''}`}</Magenta>
    {tags.map(tag => {
      const [k, v] = tag;
      return (
        <span>
          <Cyan>{k}</Cyan>=<Yellow>"{v}"</Yellow>
        </span>
      );
    })}
    {'>'}
    {children}
    {'</'}
    <Magenta>{type}</Magenta>
    {'>'}
  </IndentSpan>
);

Tag.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.string.isRequired,
  tags: PropTypes.array,
  first: PropTypes.bool,
};

Tag.defaultProps = {
  tags: [],
  first: false,
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
  margin-left: 20px;
`;

const TitleList = styled.ul`
  margin: 50px 20px 20px 20px;
`;

const TitleItem = styled.li`
  transition: margin 0.2s ease-in-out;
  font-size: 20px;
  :hover {
    margin-left: 20px;
  }
`;

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <TitleList>
      <TitleItem>
        <DateHtml>03 Fev 2019</DateHtml>
        <TitleHtml>Réduire ses controlleurs et modèles</TitleHtml>
      </TitleItem>
    </TitleList>
  </Layout>
);

export default IndexPage;
