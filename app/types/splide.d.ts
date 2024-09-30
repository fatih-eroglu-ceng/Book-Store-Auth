//Types decleration for splite library (carousel)
declare module '@splidejs/react-splide' {
  import { ComponentType, ReactNode } from 'react';

  export interface SplideProps {
    options?: {
      type?: string;
      perPage?: number;
      gap?: string;
      autoHeight?: boolean;
      [key: string]: any;
    };
    children?: ReactNode;
  }

  export const Splide: ComponentType<SplideProps>;

  export interface SplideSlideProps {
    children?: ReactNode;
  }

  export const SplideSlide: ComponentType<SplideSlideProps>;
}
