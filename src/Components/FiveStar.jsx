import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Star = styled.span`
  display: inline-block;
  position: relative;
  font-size: 1em;
  color: #ddd;

  &:after {
    font-family: FontAwesome;
    content: "\f005";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    overflow: hidden;
    color: yellow;
  }
`;

const ThreeQuarterStar = styled(Star)`
  &:after {
    width: 75%;
  }
`;

const HalfStar = styled(Star)`
  &:after {
    width: 50%;
  }
`;

const QuarterStar = styled(Star)`
  &:after {
    width: 25%;
  }
`;

const EmptyStar = styled(Star)`
  &:after {
    width: 0%;
  }
`;

function FiveStar({ rating }) {
  // Take in a number (rating to nearest quarter) return five stars filled to the nearest 1/4 star
  // Take in ratings object and return five stars filled to the nearest 1/4 star
  // const entries = Object.entries(ratings);
  // const ratingsTotal = entries.reduce(((p, c) => p + Number(c[0]) * Number(c[1])), 0);
  // const numberOfRatings = entries.reduce(((p, c) => p + Number(c[1])), 0);
  // const average = Math.round((ratingsTotal / numberOfRatings) * 10) / 10;
  // let closestQuarter = Math.round(average * 4) / 4;
  let closestQuarter = rating;
  const stars = [];

  while (closestQuarter > 0) {
    if (closestQuarter >= 1) {
      stars.push(<Star className="star fa fa-star" data-testid="full-star" />);
      closestQuarter -= 1;
    } else if (closestQuarter >= 0.75) {
      stars.push(<ThreeQuarterStar className="star fa fa-star" data-testid="3/4-star" />);
      closestQuarter -= 0.75;
    } else if (closestQuarter >= 0.5) {
      stars.push(<HalfStar className="star fa fa-star" data-testid="1/2-star" />);
      closestQuarter -= 0.5;
    } else {
      stars.push(<QuarterStar className="star fa fa-star" data-testid="1/4-star" />);
      closestQuarter -= 0.25;
    }
  }

  while (stars.length < 5) {
    stars.push(<EmptyStar className="star fa fa-star" data-testid="empty-star" />);
  }

  return (
    <div className="five-star" data-testid="five-star">
      {stars}
    </div>
  );
}

FiveStar.propTypes = {
  rating: PropTypes.number.isRequired,
};

export default FiveStar;
