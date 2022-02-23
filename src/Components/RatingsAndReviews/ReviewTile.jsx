/* eslint-disable camelcase */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Styled from 'styled-components';
import FiveStar from '../FiveStar.jsx';
import { dateFormatter } from '../../util/util.js';
import { Helpful, Report } from '../HelpfulOrReport.jsx';

const SpacedBody = Styled.div`
  overflow-wrap: anywhere;
  padding-bottom: 20px;
`;

const StyledReview = Styled.div`
  padding: 0px 10px 0px 10px;
  margin: 10px 0px 10px 0px;
  border: black;
  background-color: rgba(220, 152, 245, 0.3);
`;

const TopBar = Styled.div`
  display: flex;
  justify-content: space-between;
`;

function ReviewTile({ review, handleRefresh }) {
  const {
    review_id, rating, summary, response, body, date, helpfulness, photos, reviewer_name,
  } = review;

  return (
    // eslint-disable-next-line react/destructuring-assignment
    <StyledReview data-analytics-id={review.review_id}>
      <TopBar>
        <FiveStar rating={rating} />
        <div>
          {reviewer_name}
          {' '}
          {dateFormatter(date)}
        </div>
      </TopBar>
      <h3>{summary}</h3>
      <SpacedBody>{body}</SpacedBody>
      <div>{response}</div>
      <div className="bottom-bar">
        Helpful?
        {' '}
        <Helpful path="reviews" id={review_id} handleRefresh={handleRefresh} />
        ({helpfulness})
        {' | '}
        <Report path="reviews" id={review_id} handleRefresh={handleRefresh} />
      </div>
    </StyledReview>
  );
}

ReviewTile.propTypes = {
  handleRefresh: PropTypes.func.isRequired,
  review: PropTypes.shape({
    review_id: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    summary: PropTypes.string.isRequired,
    response: PropTypes.string,
    body: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    reviewer_name: PropTypes.string,
    helpfulness: PropTypes.number.isRequired,
    photos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      url: PropTypes.string,
    })).isRequired,
  }).isRequired,
};

FiveStar.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default ReviewTile;
