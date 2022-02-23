import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { styleOptions } from '../test_data/testdata.js';
import { standardBGColor } from '../../../styles.js';

const Scroller = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 15%;


  button {
    background-color: rgba(20, 0, 20, 0.3);
    border-radius: 0;
    border: none;
    height: 80%;
    width: 100%;
    margin: 0;
    padding: 1px;
    margin-left: -5px;
    :hover {
      cursor: pointer;
    }
    box-shadow: 0 -5px 0 rgba(89, 255, 255, 0.6);
  }
`;

const SelectedImage = styled.img`
  filter: grayscale(90%);
  margin-left: -5px;
  overflow: hide;
  object-fit: cover;
  max-height: 80%;
  box-shadow: 0 -5px 0 rgba(255, 255, 0, 0.9);
`;

const Arrow = styled.span`
  bottom: 33%;
  font-family: FontAwesome;
  font-size: 2em;
  position: relative;
  top: 33%;
  width: 100%;
`;

let indexTracker = 0;
// hold window range as a state using a tuple and use
// slice to re-define the array of thumbnails being rendered

function MainViewScroller({ thumbs, setCurrentMainImage, currentMainImageIndex }) {

  const [thumbnailIndexRange, setThumbnailIndexRange] = useState([0, 7]);

  const LeftArrow = styled(Arrow)`
    content: &#Xf104;
    left: 33%;
    color: rgba(80, 190, 250, ${currentMainImageIndex ? 1 : 0});
    text-shadow: 1px 1px rgba(20, 20, 20, ${currentMainImageIndex ? 1 : 0});
    :hover {
      cursor:${currentMainImageIndex ? 'pointer' : 'auto'}
    }
  `;

  const RightArrow = styled(Arrow)`
    content: &#Xf105;
    left: 20%;
    color: rgba(80, 190, 250, ${(currentMainImageIndex === thumbs.length - 1) ? 0 : 1});
    text-shadow: 1px 1px rgba(20, 20, 20, ${(currentMainImageIndex === thumbs.length - 1) ? 0 : 1});
    :hover {
      cursor: ${(currentMainImageIndex === thumbs.length - 1) ? 'auto' : 'pointer'};
    }
  `;

  const handleClickOnThumbnail = (index) => {
    console.log(index);
    setCurrentMainImage([thumbs[index].url, index]);
  };

  const handleArrowClick = (direction) => {

    if (direction === 'next') {
      const nextIndex = currentMainImageIndex + 1;
      if (nextIndex === thumbs.length) return;

      setCurrentMainImage([thumbs[nextIndex].url, nextIndex]);
    }

    if (direction === 'prev') {
      const prevIndex = currentMainImageIndex - 1;
      if (prevIndex < 0) return;
      setCurrentMainImage([thumbs[prevIndex].url, prevIndex]);
    }

  };

  if (currentMainImageIndex === thumbnailIndexRange[1]) {
    setThumbnailIndexRange([thumbnailIndexRange[0] + 1, thumbnailIndexRange[1] + 1]);
    indexTracker += 1;
  }

  if (currentMainImageIndex === thumbnailIndexRange[0] && currentMainImageIndex > 0) {
    setThumbnailIndexRange([thumbnailIndexRange[0] - 1, thumbnailIndexRange[1] - 1]);
    indexTracker -= 1;
  }

  return (
    <Scroller>
      <LeftArrow
        data-analytics-id="scroll-left"
        className="fas fa-angle-left fa-lg"
        type="button"
        value="left"
        onClick={() => handleArrowClick('prev')}
      />
      {thumbs.slice(...thumbnailIndexRange).map((image, index) => {
        if (currentMainImageIndex - indexTracker === index) {
          return (
            <SelectedImage
              data-analytics-id="selected thumbnail clicked (no effect)"
              src={image.thumbnail_url}
            />
          );
        }
        return (
          <button
            data-analytics-id={`thumbnail number ${index + indexTracker} selected`}
            type="button"
            onClick={() => handleClickOnThumbnail(index + indexTracker)}
          >
            <img
              className="not-selected"
              position={index}
              src={image.thumbnail_url}
              alt="placeholder renders"
            />
          </button>
        );
      })}
      <RightArrow
        data-analytics-id="scroll-right"
        className="fas fa-angle-right fa-lg"
        type="button"
        value="right"
        onClick={() => handleArrowClick('next')}
      />
    </Scroller>
  );
}

MainViewScroller.propTypes = {
  thumbs: PropTypes.isRequired,
  setCurrentMainImage: PropTypes.func.isRequired,
  currentMainImageIndex: PropTypes.number.isRequired,
};

export default MainViewScroller;
