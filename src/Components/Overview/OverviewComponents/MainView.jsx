import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Standard, standardBorder } from '../../../styles.js';
import { product, styleOptions } from '../test_data/testdata.js';
import MainViewScroller from './MainViewScroller.jsx';
import MainViewImage from './MainViewImage.jsx';
import ExpandedView from './ExpandedView.jsx';
import { OverviewContext } from '../index.jsx';
import loading from './assets/loading.gif';

const ImageView = styled.div`

  border: ${standardBorder};
  border-radius: 10px;
  margin-right: 20px;
  width: min(100%, 490px);
  height: 490px;
  overflow: hidden;
  position: relative;
  left: 10px;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

function MainView() {
  const {
    currentStyleId,
    productStyles,
    currentMainImage,
    setCurrentMainImage,
    setCurrentStyleSelection,
    currentImageThumbs,
    setCurrentImageThumbs,
  } = useContext(OverviewContext);

  const [expandView, setExpandView] = useState(false);

  const index = currentMainImage[1];

  useEffect(() => {
    productStyles.forEach((style) => {
      if (style.style_id === currentStyleId) {
        setCurrentStyleSelection(style);
        setCurrentImageThumbs(style.photos);
        setCurrentMainImage([style.photos[index].url, index]);
      }
    });
  }, [currentStyleId]);

  const toggleExpandView = (e) => {
    e.preventDefault();
    setExpandView(!expandView);
  };

  if (currentMainImage) {
    return (
      <ImageView>
        <MainViewScroller
          thumbs={currentImageThumbs}
          setCurrentMainImage={setCurrentMainImage}
          currentMainImageIndex={currentMainImage[1]}
        />
        <MainViewImage
          handleClick={toggleExpandView}
          className="main-view"
          currentImage={currentMainImage}
        />
        {expandView
          ? (
            <ExpandedView
              currentImage={currentMainImage}
              handleClick={toggleExpandView}
            />
          )
          : null}
      </ImageView>
    );
  }

  return (
    <ImageView>
      <img src={loading} alt="loading..." />
    </ImageView>
  );
}

export default MainView;
