declare module 'react-rating-stars-component' {
  import { ComponentType } from 'react';

  interface ReactStarsProps {
    count?: number;
    size?: number;
    value?: number;
    isHalf?: boolean;
    onChange?: (newRating: number) => void;
    edit?: boolean;
    activeColor?: string;
    color?: string;
    a11y?: boolean;
    [key: string]: any; // allow extra props
  }

  const ReactStars: ComponentType<ReactStarsProps>;
  export default ReactStars;
}
