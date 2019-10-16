import { useEffect, useState } from 'react';
import { throttle } from 'lodash';

// Watch scroll updates on the page
//
// Returns:
// - currentScroll: Px since top of page (integer)
// - scrollingUp: is the user scrollingUp (boolean)
//
// Props:
// - wait: number of ms to wait before firing next update. Default 200
// - onScroll: callback function to call on each scroll.
export const useScroll = props => {
  const [currentScroll, setCurrentScroll] = useState(0);
  const [scrollingUp, setScrollingUp] = useState(false);
  useEffect(() => {
    // Default values for props
    const toWait = props === undefined ? 100 : props.wait || 100;
    const actOnScroll =
      props === undefined ? () => {} : props.onScroll || (() => {});

    // Vars
    let prevScroll = window.pageYOffset;

    // Watcher
    const scrollWatcher = throttle(() => {
      // Manual debounce that fire at start of timer
      // (opposite of lodash debounce)

      const nextScroll = window.pageYOffset;
      // Don't fire on identical scroll
      if (prevScroll === nextScroll) return;
      // If toWait is really low don't fire more often than
      // browser re-rendering
      window.requestAnimationFrame(function() {
        // Action
        actOnScroll({ prevScroll, nextScroll });
        // Update state
        setCurrentScroll(nextScroll);
        setScrollingUp(nextScroll < prevScroll);
        // Update prev scroll value
        prevScroll = nextScroll;
      });
    }, toWait);

    // Listener register
    window.addEventListener('scroll', scrollWatcher);

    // Clean
    return () => {
      window.removeEventListener('scroll', scrollWatcher);
      scrollWatcher.cancel();
    };
  }, [props]);
  return { currentScroll, scrollingUp };
};
