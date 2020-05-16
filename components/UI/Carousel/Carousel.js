import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from 'reactstrap';

const items = [
  {
    src: 'http://getwallpapers.com/wallpaper/full/8/b/8/984260-cat-and-dog-wallpaper-2560x1440-for-lockscreen.jpg',
    caption: 'Slide 1'
  },
  {
    src: 'http://getwallpapers.com/wallpaper/full/d/b/4/135911.jpg',
    altText: 'Slide 2',
    caption: 'Slide 2'
  },
  {
    src: 'http://getwallpapers.com/wallpaper/full/5/6/4/1313502-white-dog-wallpaper-1920x1200-cell-phone.jpg',
    altText: 'Slide 3',
    caption: 'Slide 3'
  }
];

const carousel = (props) => {
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
        <img className="d-block w-100" src={item.src} alt={item.altText} />
      </CarouselItem>
    );
  });
  const style = {
    width: '100%',
    padding: '16px',
    textAlign: 'center',
    border: '1px solid #eee',
    boxShadow: '0 2px 3px #ccc',
    margin: '10px',
    boxSizing: 'border-box',
    backgroundColor: 'red'
  }
  return (
    <Carousel style={style}
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