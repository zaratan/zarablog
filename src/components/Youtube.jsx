import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import YoutubeContainer from 'react-youtube';
import LayoutContext from '../contexts/LayoutContext';
import { useSizeWatcher } from '../hooks/useSizeWatcher';
import YoutubeErrorCatcher from './YoutubeErrorCatcher';

function Youtube({ videoId }) {
  const { isProfileOpen } = useContext(LayoutContext);
  const size = useSizeWatcher();
  const realEstate = (isProfileOpen ? size - 400 : size) - 30;
  const videoSize = { width: 800, height: 450 };

  if (realEstate <= 400) {
    videoSize.width = 300;
    videoSize.height = 169;
  } else if (realEstate <= 500) {
    videoSize.width = 400;
    videoSize.height = 225;
  } else if (realEstate <= 600) {
    videoSize.width = 500;
    videoSize.height = 281;
  } else if (realEstate <= 700) {
    videoSize.width = 600;
    videoSize.height = 337;
  } else if (realEstate <= 800) {
    videoSize.width = 700;
    videoSize.height = 393;
  }

  return <YoutubeContainer videoId={videoId} opts={videoSize} />;
}

Youtube.propTypes = {
  videoId: PropTypes.string.isRequired,
};

const YoutubeWrap = ({ videoId }) => (
  <YoutubeErrorCatcher videoId={videoId}>
    <Youtube videoId={videoId} />
  </YoutubeErrorCatcher>
);

export default YoutubeWrap;
