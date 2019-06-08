import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const SiteTitle = styled.h1`
  font-size: 18px;
  color: #ccc;

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
  padding-left: 4px;
`;

const EmptyRight = styled.span`
  width: 70px;
`;

const Header = ({ siteTitle }) => (
  <HeaderStyle>
    <CircleContainer>
      <RedCircle />
      <YellowCircle />
      <GreenCircle />
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
