import React from 'react';
import styled from 'styled-components';
import { colors, styles } from '../../styles.js';
import RatingsBreakdown from './RatingsBreakdown.jsx';
import ReviewsList from './ReviewsList.jsx';

const RandRStyle = styled.div`
  ${styles.Standard};
  display: grid;
  grid-template-columns: 1fr 25px 2fr;
  gird-template-rows: 50px 1fr;
  height: fit-content;
  width: 100%;
`;

const Title = styled.h3`
  font-family: inherit;
  grid-column: 1 / span 3;
  grid-row-start: 1;
`;

const LeftPane = styled.div`
  grid-column: 1;
  grid-row-start: 2;
`;

const RightPane = styled.div`
  grid-column-start: 3;
  grid-row-start: 2;
`;

function RatingsAndReviews() {
  return (
    <RandRStyle className="ratingsAndReviews">
      <Title>
        Ratings & Reviews
      </Title>
      <LeftPane>
        <RatingsBreakdown />
      </LeftPane>
      <RightPane>
        <ReviewsList />
      </RightPane>
    </RandRStyle>
  );
}

export default RatingsAndReviews;
