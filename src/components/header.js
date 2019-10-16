import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isBrowser } from 'react-device-detect';
import ThemeContext from '../contexts/ThemeContext';
import LayoutContext from '../contexts/LayoutContext';
import { useScroll } from '../hooks/useScroll';

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

const calculateHeaderPositioning = (currentScroll, scrollingUp) => {
  if (currentScroll < 80) {
    return `
      top: 0;
    `;
  }

  if (scrollingUp)
    return `
    top:0;
  `;

  return `
    top: -50px;
  `;
};

const HeaderStyle = styled.header`
  height: 40px;
  background-color: ${props => props.theme.base2};
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 500px) {
    height: 50px;
    padding-right: 14px;
  }
  width: 100%;
  transition: top 0.3s ease-in-out;
  position: fixed;
  ${props => calculateHeaderPositioning(props.currentScroll, props.scrollingUp)}
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

const CircleContainer = styled.nav`
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

const Header = ({ siteTitle }) => {
  const { isDark, toggleDark } = useContext(ThemeContext);
  const { toggleProfileOpen, closeProfile } = useContext(LayoutContext);
  const actOnLightButton = event => {
    if (event.keyCode && (event.keyCode !== 13 && event.keyCode !== 32)) return;
    toggleDark();
  };

  const actOnProfileButton = event => {
    if (event.keyCode && (event.keyCode !== 13 && event.keyCode !== 32)) return;
    toggleProfileOpen();
  };

  const actOnHomeButton = event => {
    if (
      isBrowser ||
      (event.keyCode && (event.keyCode !== 13 && event.keyCode !== 32))
    )
      return;
    closeProfile();
  };

  const { currentScroll, scrollingUp } = useScroll();

  return (
    <HeaderStyle scrollingUp={scrollingUp} currentScroll={currentScroll}>
      <CircleContainer>
        <CircleLink
          aria-label="home"
          to="/"
          onClick={actOnHomeButton}
          onKeyDown={actOnHomeButton}
        >
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
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
