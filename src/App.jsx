/* eslint-disable import/no-cycle */
import React, {
  useState, useEffect, useContext, createContext, useMemo, useLayoutEffect,
} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import axios from 'axios';
import SearchSite from './Components/SearchSite.jsx';
import Overview from './Components/Overview/index.jsx';
import RatingsAndReviews from './Components/RatingsAndReviews/index.jsx';
import QuestionsAndAnswers from './Components/QuestionsAndAnswers/index.jsx';
import RelatedItemsAndComparisons from './Components/RelatedItemsAndComparisons/index.jsx';
import { colors, styles } from './styles.js';
import { ratingsCalculator } from './util/util.js';

const GlobalStyle = createGlobalStyle`
html {
  display: flex;
  justify-content: center;
  left: 50px;
}

body {
  background-color: ${colors.standardBGColor};
  color: ${colors.standardTxtColor};
  display: flex;
  flex-direction: column;
  font-family: 'Comfortaa', monospace;
  justify-content: center;
  position: absolute;
  max-width: 1200px;

  button {
    background-color: rgba(255, 240, 240);
    border: thin solid teal;
    border-radius: 15px;
    font-family: inherit;
    margin: 5px;
    padding: 5px;

    :hover{
      background-color: rgb(255, 255, 255);
      border-color: gold;
      cursor: pointer;
    }
    :active {
      background-color: rgba(200, 255, 255, 0.9);
    }
  }
  select {
    border: thin solid teal;
    border-radius: 10px;
    background-color: rgba(255, 240, 240);
    font-family: inherit;
    :hover {
      background-color: rgb(255, 255, 255);
      border-color: gold;
      cursor: pointer;
    }
}
`;

const TitleBar = styled.div`
  background-color: ${colors.standardBGColor};
  color: ${colors.standardTxtColor};
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: sticky;
  top: 0;
  z-index: 10;

  h1 {
    font-weight: 700;
    padding: 0 40px 0 40px;
    text-shadow: -2px 2.5px 0 rgba(130, 200, 250, 0.9);
    width: 100%;
  }
`;

const titles = ["Owen's Oddities", "Ken's Klutter", "Ryan's Retail", "Daniel's Duds"];
const randomTitle = titles[Math.floor(Math.random() * 4)];

export const GlobalContext = createContext(0);

function App() {

  // State
  const [ratingsData, setRatingsData] = useState({
    ratings: {},
    averageRating: 0,
    closestQuarter: 0,
    numberOfRatings: 0,
    characteristics: {},
    recommended: {},
  });

  // For testing
  const exampleProductIds = [40344, 40345, 40348];

  const [productId, setProductId] = useState(exampleProductIds[2]);

  useLayoutEffect(() => {
    axios.get(`shopdata/reviews/meta/?product_id=${productId}`)
      .then((res) => {
        const { characteristics, recommended, ratings } = res.data;
        const { closestQuarter, averageRating, numberOfRatings } = ratingsCalculator(res.data.ratings);
        setRatingsData({
          ratings,
          averageRating,
          closestQuarter,
          numberOfRatings,
          characteristics,
          recommended,
        });
      })
      .catch((err) => (
        console.log(err)
      ));

  }, [productId]);

  return (
    <GlobalContext.Provider value={{
      ratingsData,
      productId,
      setProductId,
    }}
    >
      <GlobalStyle />
      <TitleBar>
        <h1>{randomTitle}</h1>
        <SearchSite className="search-site" />
      </TitleBar>
      <Overview />
      <RatingsAndReviews />
      <RelatedItemsAndComparisons />
      <QuestionsAndAnswers />
    </GlobalContext.Provider>
  );
}

export default App;
