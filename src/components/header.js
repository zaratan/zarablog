import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SiteTitle = styled.h1`
  font-size: 24px;
  color: ${props => props.theme.base1};
  display: flex;
  align-items: center;
  height: 40px;
  margin: 0;

  a {
    color: ${props => props.theme.base1};
    :hover {
      color: ${props => props.theme.orange};
    }
    :focus {
      color: ${props => props.theme.orange};
    }
  }

  @media only screen and (max-width: 500px) {
    font-size: 24px;
    height: 50px;
    justify-self: right;
  }
`;

const HeaderStyle = styled.header`
  height: 40px;
  background-color: ${props => props.theme.base2};
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 500px) {
    height: 50px;
    padding-right: 14px;
  }
`;

const CircleLink = styled(Link)`
  height: 40px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;
  transition: height 0.2s ease-in-out;
  transition: width 0.2s ease-in-out;

  :focus,
  :hover {
    outline: none;
    box-shadow: none;

    span {
      height: 28px;
      width: 28px;
    }
    svg,
    a {
      outline: none;
      box-shadow: none;
      color: #000;
      opacity: 1;
    }
  }

  @media only screen and (max-width: 500px) {
    height: 50px;
  }
`;

const CircleButton = styled(CircleLink).attrs({
  as: 'span',
  tabIndex: 0,
  role: 'button',
})``;

const Circle = styled.span`
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  padding: 0;
  height: 24px;
  width: 24px;
  @media only screen and (max-width: 500px) {
    height: 28px;
    width: 28px;
  }
`;

const Icon = styled(FontAwesomeIcon)`
  width: 18px;
  height: 18px;
  opacity: 0.6;
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
  width: 120px;
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

const Header = ({
  siteTitle,
  setIsDark,
  isDark,
  setProfileOpen,
  isProfileOpen,
}) => {
  const actOnLightButton = event => {
    if (event.keyCode && (event.keyCode !== 13 && event.keyCode !== 32)) return;
    setIsDark(!isDark);
  };

  const actOnProfileButton = event => {
    if (event.keyCode && (event.keyCode !== 13 && event.keyCode !== 32)) return;
    setProfileOpen(!isProfileOpen);
  };

  return (
    <HeaderStyle>
      <CircleContainer>
        <CircleLink aria-label="home" to="/">
          <RedCircle>
            <Icon icon="home" />
          </RedCircle>
        </CircleLink>
        <CircleButton
          aria-label="light"
          onClick={actOnLightButton}
          onKeyDown={actOnLightButton}
        >
          <YellowCircle>
            {isDark ? <Icon icon="sun" /> : <Icon icon="moon" />}
          </YellowCircle>
        </CircleButton>
        <CircleButton
          aria-label="profile"
          onClick={actOnProfileButton}
          onKeyDown={actOnProfileButton}
        >
          <GreenCircle>
            <Icon icon="user" />
          </GreenCircle>
        </CircleButton>
      </CircleContainer>
      <SiteTitle>
        <Link to="/">{siteTitle}</Link>
      </SiteTitle>
      <EmptyRight />
    </HeaderStyle>
  );
};

Header.propTypes = {
  siteTitle: PropTypes.string,
  setIsDark: PropTypes.func.isRequired,
  isDark: PropTypes.bool.isRequired,
  setProfileOpen: PropTypes.func.isRequired,
  isProfileOpen: PropTypes.bool.isRequired,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
