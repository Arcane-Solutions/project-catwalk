import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import StyleName from './StyleName.jsx';
import { styleOptions } from '../test_data/testdata.js';
import { OverviewContext } from '../index.jsx';
import loading from './assets/loading.gif';


const StyleSelectors = styled.div`
  position: relative;
  top: -30px;

  .selector {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(auto-fill, 60px);
    width: min-content;
  }

  img {
    width: 50px;
    height: 50px;
  }

  p {
    text-shadow: -1px 1px 1px grey;
  }
`;

const testStyles = styleOptions.results;

function StyleSelection() {
  const { productStyles, currentStyleSelection } = useContext(OverviewContext);


  console.log(productStyles);
  if (productStyles.length) {
    const [currentStyleName, setCurrentStyleName] = useState(productStyles[0].name);
    return (
      <StyleSelectors>
        <p className="style-name"><em>{currentStyleName}</em></p>
        {productStyles.map((style) => (
          <StyleName
            salePrice={style.sale_price}
            className="selector"
            thumb={style.name}
            key={style.style_id}
            styleId={style.style_id}
            setCurrentStyleName={setCurrentStyleName}
            icon={style.photos[0].thumbnail_url}
          />
        ))}
      </StyleSelectors>
    );
  }
  return (
    <StyleSelectors>
      <img src={loading} alt="loading..." />
    </StyleSelectors>
  );
}

export default StyleSelection;
