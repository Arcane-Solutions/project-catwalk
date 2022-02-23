import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Expand = styled.button`
  margin: 0;
  padding: 0;
  border: 0;
  height: 100%;
  width: 100%;

  :hover {
    cursor: zoom-in;
  }
`;

function MainViewImage({ currentImage, handleClick }) {
  return (
    <Expand
      type="button"
      onClick={handleClick}
    >
      <img
        src={currentImage}
        alt="The product currently being showcased"
      />
    </Expand>
  );
}

MainViewImage.propTypes = {
  currentImage: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default MainViewImage;
