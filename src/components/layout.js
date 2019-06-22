/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import React, { useContext } from 'react';
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
import GlobalStyle from '../styles/GlobalStyle';
import Profile from './profile';
import ThemeContext from '../contexts/ThemeContext';
import LayoutContext from '../contexts/LayoutContext';

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
  align-self: flex-start;
  flex-shrink: 1;
  @media only screen and (max-width: 700px) {
    display: ${props => (props.profileOpen ? `none` : `flex`)};
  }
`;

const MainWrapper = styled.div`
  background-color: ${props => props.theme.base3};
  width: 100%;
  max-width: inherit;
  flex-grow: 1;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
`;

const Footer = styled.footer`
  background-color: ${props => props.theme.base2};
  color: ${props => props.theme.yellow};
  display: flex;
  justify-content: center;
  height: 25px;
  align-items: center;
`;

const AsideProfile = styled.aside`
  display: ${props => (props.profileOpen ? `block` : `none`)};

  @media only screen and (min-width: 700px) {
    width: 400px;
    min-width: 400px;
    border-left: 1px solid ${props => props.theme.yellow};
  }
  @media only screen and (max-width: 800px) {
    min-width: 300px;
  }
  @media only screen and (max-width: 700px) {
    min-width: 100px;
  }
`;

const Layout = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const { isProfileOpen } = useContext(LayoutContext);

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
            <Header siteTitle={data.site.siteMetadata.title} />
            <MainWrapper>
              <Main profileOpen={isProfileOpen}>{children}</Main>
              <AsideProfile profileOpen={isProfileOpen}>
                <Profile />
              </AsideProfile>
            </MainWrapper>
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
