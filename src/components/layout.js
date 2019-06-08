/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';

import Header from './header';
import theme from '../styles/BaseTheme';
import './layout.css';
import GlobalStyle from '../styles/GlobalStyle';

const Main = styled.main`
  background-color: ${props => props.theme.base03};
  width: 100%;
  max-width: inherit;
`;

const Footer = styled.footer`
  background-color: ${props => props.theme.base02};
  color: ${props => props.theme.yellow};
  display: flex;
  justify-content: center;
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <>
          <GlobalStyle />
          <Header siteTitle={data.site.siteMetadata.title} />
          <Main>{children}</Main>
          <Footer>Zaratan © {new Date().getFullYear()}</Footer>
        </>
      </ThemeProvider>
    )}
  />
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
