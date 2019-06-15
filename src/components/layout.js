/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import styled, { ThemeProvider } from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faHome,
  faUser,
  faSun,
  faMoon,
  faMugHot,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';

import {
  faTwitter,
  faPatreon,
  faGithub,
} from '@fortawesome/free-brands-svg-icons';

import Header from './header';
import baseTheme, { lightTheme, darkTheme } from '../styles/BaseTheme';
import GlobalStyle from '../styles/GlobalStyle';

[
  faHome,
  faSun,
  faUser,
  faMoon,
  faEnvelope,
  faMugHot,
  faTwitter,
  faPatreon,
  faGithub,
].forEach(icon => library.add(icon));

const Main = styled.main`
  background-color: ${props => props.theme.base3};
  width: 100%;
  max-width: inherit;
`;

const Footer = styled.footer`
  background-color: ${props => props.theme.base2};
  color: ${props => props.theme.yellow};
  display: flex;
  justify-content: center;
  height: 25px;
  align-items: center;
`;

const Layout = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const theme = Object.assign({}, baseTheme, isDark ? darkTheme : lightTheme);

  return (
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
            <Header
              siteTitle={data.site.siteMetadata.title}
              setIsDark={setIsDark}
              isDark={isDark}
            />
            <Main>{children}</Main>
            <Footer>Zaratan © {new Date().getFullYear()}</Footer>
          </>
        </ThemeProvider>
      )}
    />
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
