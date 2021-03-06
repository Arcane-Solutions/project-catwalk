import React, {
  useContext,
  useEffect,
  useState,
  useMemo,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import Styled from 'styled-components';
import { GlobalContext } from '../../App.jsx';
import { ReviewContext } from './index.jsx';
import ReviewTile from './ReviewTile.jsx';
import ReviewModal from '../ReviewModal.jsx';

const ScrollDiv = Styled.div`
  min-height: 40vh;
  max-height: 40vh;
  overflow-y: scroll;
`;

function ReviewsList() {
  const { averageRating, closestQuarter, numberOfRatings } = useContext(GlobalContext).ratingsData;
  const { productId } = useContext(GlobalContext);
  const { starFilter, setStarFilter } = useContext(ReviewContext);
  const [reviews, setReviews] = useState([]);
  const [displayNumber, setDisplayNumber] = useState(2);
  const [sort, setSort] = useState('relevant');
  const [showModal, setShowModal] = useState(false);

  const starList = useMemo(() => {
    if (starFilter.length === 0) return reviews;
    return reviews.filter((review) => starFilter.includes(review.rating));
  }, [reviews, starFilter]);

  const updateDisplayNumber = () => {
    setDisplayNumber((previous) => previous + 2);
  };

  const dropdownSort = (option) => {
    axios({
      method: 'get',
      url: 'shopdata/reviews/',
      params: {
        count: 1000,
        sort: option,
        product_id: productId,
      },
    })
      .then((res) => {
        setReviews(res.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    setSort(e.target.value);
    dropdownSort(e.target.value);
  };

  const handleRefresh = () => {
    dropdownSort(sort);
  };

  useEffect(() => {
    dropdownSort(sort);
  }, [productId]);


  return (
    <div data-analytics-id="review-list-pane">
      <div>
        {reviews.length}&nbsp;reviews sorted by&nbsp;
        <select data-analytics-id={`sort-${sort}`} value={sort} onChange={handleChange}>
          <option value="relevant">relevant</option>
          <option value="helpful">helpful</option>
          <option value="newest">newest</option>
        </select>
        <hr />
      </div>
      {reviews.length > 0
      && (
      <ScrollDiv>
        {starList.length > 0 ? starList.slice(0, displayNumber).map((review) => (
          <ReviewTile
            key={review.review_id}
            data-testid={`review-${review.review_id}`}
            handleRefresh={handleRefresh}
            review={review}
          />
        )) : <div><br /><div>No written and unreported reviews for the selected ratings filters</div></div>}
      </ScrollDiv>
      )}
      <div>
        <hr />
        {displayNumber < reviews.length
        && <button data-analytics-id="more-reviews" type="button" onClick={updateDisplayNumber}>More Reviews</button>}
        <button data-analytics-id="add-review" type="button" onClick={() => setShowModal(true)}>Add Review</button>
        <button
          data-analytics-id="clear"
          type="button"
          onClick={() => setStarFilter([])}
          disabled={!starFilter.length}
        >Clear Filters
        </button>
        {showModal && <ReviewModal id={productId} onDismiss={() => setShowModal(false)} />}
      </div>
    </div>
  );
}

export default ReviewsList;
