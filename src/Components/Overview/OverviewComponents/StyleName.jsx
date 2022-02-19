import React, { useContext } from 'react';
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
    cursor: auto;
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
}) {
  const {
    setCurrentStyleId,
    setCurrentMainImage,
    currentStyleId,
  } = useContext(OverviewContext);

  const handleClickOnStyleName = () => {
    setCurrentStyleId(styleId);
    setCurrentStyleName(thumb);
  };

  if (currentStyleId === styleId) {
    return (
      <SelectedStyle>
        <img src={icon} alt={thumb} />
      </SelectedStyle>
    );
  }

  return (
    <StyleSelector
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
};

export default StyleName;
