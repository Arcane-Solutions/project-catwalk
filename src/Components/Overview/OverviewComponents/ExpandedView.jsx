import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Modal = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 14;
  background-color: rgba(20, 20, 20, 0.5);

  img {
    position: relative;
    border: thick solid rgba(150, 200, 255, 0.8);
    border-radius: 10px;
    max-height: 900px;
    max-width: 900px;
  }

  :hover {
    cursor: zoom-out;
  }
`;

function ExpandedView({ currentImage, handleClick }) {
  return (
    <Modal onClick={handleClick}>
      <img src={currentImage} alt="expanded view enabled" />
    </Modal>
  );
}

ExpandedView.propTypes = {
  currentImage: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default ExpandedView;
