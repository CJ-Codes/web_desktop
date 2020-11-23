import { useState, useEffect } from 'react';

// window view size
const wimdowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight
})

// get window view size
export function useWindowSize () {
  const [size, setSize] = useState(wimdowSize());

  function resizeView() {
    setSize(wimdowSize())
  }

  useEffect(() => { // mount
    window.addEventListener('resize', resizeView);

    return () => // unmoumt
      window.removeEventListener('resize', resizeView);
  }, [])

  return size
}