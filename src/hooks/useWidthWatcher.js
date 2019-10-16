import { useState, useEffect } from 'react';
import { debounce } from 'lodash';

// Hook for watch width change
//
// Returns size
//
// Props
// - wait: How much time (in ms) to wait between updates. Default 100ms
export const useWidthWatcher = props => {
  // Read options
  let firstWidth = 1440;
  try {
    firstWidth = window.innerWidth;
  } catch (error) {
    console.log("window object don't exist in SSR");
  }
  const [width, setWidth] = useState(firstWidth);

  useEffect(() => {
    // Default
    const toWait = props === undefined ? 100 : props.wait || 100;

    // Don't fire too fast
    const widthWatcher = debounce(() => {
      setWidth(window.innerWidth);
    }, toWait);

    // Watch event
    window.addEventListener('resize', widthWatcher);
    // Clean
    return () => {
      window.removeEventListener('resize', widthWatcher);
    };
  }, [props]);
  return width;
};
