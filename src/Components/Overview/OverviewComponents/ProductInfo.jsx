/* eslint-disable import/no-cycle */
import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { product } from '../test_data/testdata.js';
import FiveStar from '../../FiveStar.jsx';
import { GlobalContext } from '../../../App.jsx';
import { OverviewContext } from '../index.jsx';

const ProductInformationStyle = styled.div`
  display: grid;
  grid-template-rows: repeat(4, 0.5fr);
  margin-bottom: 10px;
  height: 80%;

  position: relative;
  top: -5%;

  .overview-info {
    padding: 1px;
  }

  h2{
    margin-bottom: 10px;
  }

  h4{
    margin: 0;
    margin-top: 10px;
    padding: 0;
  }
`;

function ProductInformation() {
  const { closestQuarter } = useContext(GlobalContext).ratingsData;
  const { productInfo, salePrice } = useContext(OverviewContext);

  return (
    <ProductInformationStyle>
      <h2 className="overview-info name">{productInfo.name}</h2>
      <FiveStar className="overview-info stars" rating={closestQuarter} />
      <h4 className="overview-info category">{productInfo.category}</h4>
      <h3 className="overview-info price">
        $
        {salePrice || productInfo.default_price}
      </h3>
      <div className="overview-info description">{productInfo.description}</div>
    </ProductInformationStyle>
  );
}

export default ProductInformation;
