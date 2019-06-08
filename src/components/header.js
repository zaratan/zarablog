import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

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
`;

const HeaderStyle = styled.header`
  height: 25px;
  background-color: #555;
  display: flex;
  justify-content: space-between;
`;

const CircleLink = styled(Link)`
  height: 25px;
  display: flex;
  align-items: center;
`;

const Circle = styled.span`
  height: 1px;
  padding: 7px;
  background-color: #666;
  border-radius: 50%;
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
`;

const EmptyRight = styled.span`
  width: 70px;
`;

const Header = ({ siteTitle }) => (
  <HeaderStyle>
    <CircleContainer>
      <CircleLink to="/">
        <RedCircle />
      </CircleLink>
      <CircleLink to="/">
        <YellowCircle />
      </CircleLink>
      <CircleLink to="/">
        <GreenCircle />
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
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
