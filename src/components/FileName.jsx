import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FileNameContainer = styled.span`
  color: ${props => props.theme.orange};
  background-color: ${props => props.theme.base2};
  margin-bottom: -9px;
  padding: 0.4rem 1rem;
  font-style: italic;
  display: block;
  border-radius: 0.3em 0.3em 0 0;
  ::before {
    color: ${props => props.theme.base1};
    content: 'FILE: ';
  }
  & + div pre {
    border-radius: 0;
  }
`;

function FileName({ filename }) {
  return <FileNameContainer>{filename}</FileNameContainer>;
}

FileName.propTypes = {
  filename: PropTypes.string.isRequired,
};

export default FileName;
