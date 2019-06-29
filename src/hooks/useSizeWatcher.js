import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const genSizeWatcher = (setSize, time) =>
  debounce(() => {
    console.log('resized !');
    setSize(window.innerWidth);
  }, time);

export const useSizeWatcher = props => {
  const [size, setSize] = useState(window ? window.innerWidth : '1440');
  useEffect(() => {
    const toWait = props === undefined ? 100 : props.wait || 100;
    const sizeWatcher = genSizeWatcher(setSize, toWait);
    window.addEventListener('resize', sizeWatcher);
    return () => {
      window.removeEventListener('resize', sizeWatcher);
    };
  }, [props]);
  return size;
};
