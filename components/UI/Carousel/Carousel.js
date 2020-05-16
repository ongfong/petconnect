import React from 'react';

import ReactPlayer from "react-player";


const carousel = () => {

  const style = {
    width: '100%',
    padding: '16px',
    textAlign: 'center',
    border: '1px solid #eee',
    boxShadow: '0 2px 3px #ccc',
    margin: '10px',
    boxSizing: 'border-box',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center'
}

  return (
    <div style={style}>
      <ReactPlayer
          url='https://ak.picdn.net/shutterstock/videos/17178685/preview/stock-footage-pets-on-a-white-background.webm'
          playing={true}
          loop={true}
          vimeoConfig={{ iframeParams: { fullscreen: 0 } }}
      />
    </div>
  );
}
  
export default carousel;

