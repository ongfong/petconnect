import React, { useState } from 'react';

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
  } from 'reactstrap';
  

  const items = [
    {
      src: 'http://getwallpapers.com/wallpaper/full/e/d/7/1455643-vertical-dog-wallpapers-for-computer-1920x1080-iphone.jpg',
      altText: 'Slide 1',
    },
    {
      src: 'http://getwallpapers.com/wallpaper/full/4/a/6/1455634-most-popular-dog-wallpapers-for-computer-1920x1080-for-android.jpg',
      altText: 'Slide 2',
    },
    {
      src: 'http://getwallpapers.com/wallpaper/full/a/e/5/1455656-full-size-dog-wallpapers-for-computer-1920x1080-for-4k.jpg',
      altText: 'Slide 3',
    }
  ];
  
  const carousel = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);
  
    const next = () => {
      if (animating) return;
      const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
  
    const previous = () => {
      if (animating) return;
      const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
      setActiveIndex(nextIndex);
    }
  
    const goToIndex = (newIndex) => {
      if (animating) return;
      setActiveIndex(newIndex);
    }
  
    const slides = items.map((item) => {
      return (
        <CarouselItem
          onExiting={() => setAnimating(true)}
          onExited={() => setAnimating(false)}
          key={item.src}
        >
          <img src={item.src} alt={item.altText} />
          <CarouselCaption captionText={item.caption} captionHeader={item.caption} />
        </CarouselItem>
      );
    });
  
    return (
      <Carousel  style={{width: '66%', height: '200px'}}
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
            {slides}
        <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
        <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
      </Carousel>
    );
  }

export default carousel;

