import React from 'react';
import PropTypes from 'prop-types';

const MovieReview = ({review}) => {
  const {comment, date, rating, user} = review;
  const {name} = user;

  const dateObject = new Date(date);

  return <div className="review">
    <blockquote className="review__quote">
      <p className="review__text">{comment}</p>

      <footer className="review__details">
        <cite className="review__author">{name}</cite>
        <time className="review__date" dateTime="2016-12-24">{dateObject.toLocaleString(`en-US`, {month: `long`})} {dateObject.getDate()}, {dateObject.getFullYear()}</time>
      </footer>
    </blockquote>

    <div className="review__rating">{rating}</div>
  </div>;
};

MovieReview.propTypes = {
  review: PropTypes.shape({
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    user: PropTypes.object.isRequired
  }).isRequired
};

export default MovieReview;
