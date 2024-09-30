'use client';

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

const Carousel = () => {
  return (
    <Splide
      options={{
        type: 'loop',
        perPage: 1,
        gap: '1rem',
        autoHeight: true,
      }}
    >
      <SplideSlide>
        <img src="/images/banner-1.png" alt="banner1" />
      </SplideSlide>
      <SplideSlide>
        <img src="/images/banner-2.png" alt="banner2" />
      </SplideSlide>
      <SplideSlide>
        <img src="/images/banner-3.png" alt="banner3" />
      </SplideSlide>
    </Splide>
  );
};

export default Carousel;
