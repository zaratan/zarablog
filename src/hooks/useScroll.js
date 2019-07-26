import { useEffect, useState } from 'react';

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
    const toWait = props === undefined ? 200 : props.wait || 200;
    const actOnScroll =
      props === undefined ? () => {} : props.onScroll || (() => {});

    // Vars
    let prevScroll = window.pageYOffset;
    let scrollWatcherHasFiredRecently = false;
    let timeOutId = null;

    // Watcher
    const scrollWatcher = () => {
      // Manual debounce that fire at start of timer
      // (opposite of lodash debounce)
      if (!scrollWatcherHasFiredRecently) {
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

          // Wait a bit to allow next call
          timeOutId = setTimeout(() => {
            scrollWatcherHasFiredRecently = false;
          }, toWait);
        });
        scrollWatcherHasFiredRecently = true;
      }
    };

    // Listener register
    window.addEventListener('scroll', scrollWatcher);

    // Clean
    return () => {
      window.removeEventListener('scroll', scrollWatcher);
      window.clearInterval(timeOutId);
    };
  }, [props]);
  return { currentScroll, scrollingUp };
};
