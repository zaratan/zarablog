import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SiteTitle = styled.h1`
  font-size: 18px;
  color: #ccc;
  display: flex;
  align-items: center;
  height: 25px;
  margin: 0;

  a {
    color: #ccc;
  }
  @media only screen and (max-width: 500px) {
    font-size: 24px;
    height: 50px;
    justify-self: right;
  }
`;

const HeaderStyle = styled.header`
  height: 25px;
  background-color: #555;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 500px) {
    height: 50px;
    padding-right: 14px;
  }
`;

const CircleLink = styled(Link)`
  height: 25px;
  display: flex;
  align-items: center;
  :hover {
    color: #000;
  }

  :focus {
    outline: none;
    box-shadow: none;
    color: #000;
  }

  :focus svg {
    outline: none;
    box-shadow: none;
    color: #000;
  }
  @media only screen and (max-width: 500px) {
    height: 50px;
  }
`;

const Circle = styled.span`
  background-color: #666;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  padding: 0;
  height: 14px;
  width: 14px;
  @media only screen and (max-width: 500px) {
    height: 28px;
    width: 28px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  width: 10px;
  height: 10px;
  opacity: 0.6;
  transition: opacity 0.2s ease-in-out;
  :hover {
    opacity: 0.9;
  }
  @media only screen and (max-width: 500px) {
    height: 20px;
    width: 20px;
  }
`;

const RedCircle = styled(Circle)`
  background-color: ${props => props.theme.red};
`;

const YellowCircle = styled(Circle)`
  background-color: ${props => props.theme.yellow};
`;

const GreenCircle = styled(Circle)`
  background-color: ${props => props.theme.green};
`;

const CircleContainer = styled.div`
  display: flex;
  width: 70px;
  align-self: center;
  justify-content: space-around;
  align-items: center;
  padding-left: 4px;
  @media only screen and (max-width: 500px) {
    width: 140px;
  }
`;

const EmptyRight = styled.span`
  width: 70px;
  @media only screen and (max-width: 500px) {
    display: none;
  }
`;

const Header = ({ siteTitle, setIsDark, isDark }) => (
  <HeaderStyle>
    <CircleContainer>
      <CircleLink to="/">
        <RedCircle>
          <Icon icon="home" />
        </RedCircle>
      </CircleLink>
      <YellowCircle onClick={() => setIsDark(!isDark)}>
        {isDark ? <Icon icon="sun" /> : <Icon icon="moon" />}
      </YellowCircle>
      <CircleLink to="/">
        <GreenCircle>
          <Icon icon="user" alt="Profile" />
        </GreenCircle>
      </CircleLink>
    </CircleContainer>
    <SiteTitle>
      <Link to="/">{siteTitle}</Link>
    </SiteTitle>
    <EmptyRight />
  </HeaderStyle>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
  setIsDark: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
