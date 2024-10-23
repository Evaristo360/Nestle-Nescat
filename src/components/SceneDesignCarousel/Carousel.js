import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import ReactTooltip from 'react-tooltip';
import ArrowLeft from 'assets/icons/arrow-left.svg';
import ArrowRight from 'assets/icons/arrow-right.svg';
import SvgIcon from 'components/SvgIcon';
import { useTheme } from 'hooks/useTheme';

const Carousel = ({ items, onClickItem }) => {
  const { currentTheme } = useTheme();

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [items]);

  return (
    <CarouselProvider
      visibleSlides={4}
      totalSlides={items.length}
      step={4}
      naturalSlideWidth={115}
      naturalSlideHeight={85}
      css={css`
        margin-top: 1rem;
        padding-left: 1rem;
        padding-right: 1rem;
        .button-back {
          position: absolute;
          top: 17px;
          left: 0;
        }
        .button-next {
          position: absolute;
          top: 17px;
          right: 0;
        }
        .video-fluid {
          width: 100%;
        }
      `}
    >
      <ButtonBack className="button-back">
        <SvgIcon
          src={ArrowLeft}
          // color={currentTheme.emphasis}
          width={10}
          height={17}
        />
      </ButtonBack>
      <Slider>
        <ReactTooltip side="top" type="dark" />
        {items.map((it, i) => (
          <Slide index={i} key={i}>
            {it.media_type === 'video' ? (
              <button onClick={() => onClickItem(it.id)}>
                <video
                  src={it.source}
                  className="video-fluid"
                  data-tip={it.name}
                ></video>
              </button>
            ) : (
              <button onClick={() => onClickItem(it.id)}>
                <img
                  src={it.source}
                  alt={it.name}
                  className="img-fluid"
                  data-tip={it.name}
                />
              </button>
            )}
          </Slide>
        ))}
      </Slider>
      <ButtonNext className="button-next">
        <SvgIcon
          src={ArrowRight}
          // color={currentTheme.emphasis}
          width={10}
          height={17}
        />
      </ButtonNext>
    </CarouselProvider>
  );
};

export default Carousel;
