import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { OverviewContext } from '../index.jsx';


const StyleSelector = styled.button`
  background-color: pink;
  border: thin solid teal;
  border-radius: 50%;
  cursor: pointer;
  height: 50px;
  margin-right: 5px;
  width: 50px;

  :hover {
    background-color: rgb(255, 230, 230);
    border-color: rgb(70, 230, 175);
  }

  img {
    border-radius: 50%;
    object-fit: cover;
    position: relative;
    top: -9px;
    left: -1px;
    filter: saturate(120%);
  }
`;

const SelectedStyle = styled(StyleSelector)`
  background-color: rgb(101, 215, 230);
  border: thin solid gold;

  :hover {
    background-color: rgb(101, 215, 230);
    border: thin solid gold;
    cursor: default;
  }

  img {
    border-radius: 50%;
    object-fit: cover;
    filter: grayscale(90%) blur(0.2px);
  }
`;

function StyleName({
  thumb,
  styleId,
  setCurrentStyleName,
  icon,
  salePrice,
}) {

  const {
    setCurrentStyleId,
    setCurrentMainImage,
    setCurrentImageThumbs,
    currentStyleId,
    setSalePrice,
    productStyles,
    setCurrentStyleSelection,
  } = useContext(OverviewContext);

  const handleClickOnStyleName = () => {
    setCurrentStyleName(thumb);
    setCurrentStyleId(styleId);
  };

  if (salePrice) {
    setSalePrice(salePrice);
  }

  if (currentStyleId === styleId) {
    return (
      <SelectedStyle data-analytics-id="selected style clicked (no effect)">
        <img src={icon} alt={thumb} />
      </SelectedStyle>
    );
  }

  return (
    <StyleSelector
      data-analytics-id={`style ${styleId} selected`}
      onClick={handleClickOnStyleName}
    >
      <img src={icon} alt={thumb} />
    </StyleSelector>
  );
}

StyleName.propTypes = {
  thumb: PropTypes.string.isRequired,
  styleId: PropTypes.number.isRequired,
  setCurrentStyleName: PropTypes.func.isRequired,
  icon: PropTypes.string.isRequired,
  salePrice: PropTypes.isRequired,
};

export default StyleName;
