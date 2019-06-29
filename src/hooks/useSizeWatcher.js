import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

const genSizeWatcher = (setSize, time) =>
  debounce(() => {
    console.log('resized !');
    setSize(window.innerWidth);
  }, time);

export const useSizeWatcher = props => {
  var window;
  const [size, setSize] = useState(typeof window === undefined ? '1440' : window.innerWidth);
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
