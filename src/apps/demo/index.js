import React, { useEffect } from 'react';
import { ScrollContext } from '../../component/'
import { Main } from "./style";

export default ({ view, setDisplay }) => {

  useEffect(() => {
    setDisplay(true)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <ScrollContext>
    <Main>
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="//github.com/CJ-Codes/web-desktop"
        >项目地址</a>
      </div>
      <video
        controls
        src="/lib/video/func_demo.mp4"
      ></video>
    </Main>
    </ScrollContext>
  )
}