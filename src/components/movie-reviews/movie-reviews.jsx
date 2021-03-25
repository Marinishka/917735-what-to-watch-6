import React from 'react';
import PropTypes from 'prop-types';
import {REVIEWS_ROWS} from '../../const';
import useAPI from '../../hooks/useAPI';
import MovieReview from '../movie-review/movie-review';

const getListReview = (reviews) => {
  const subarray = [];
  for (let i = 0; i < Math.ceil(reviews.length / REVIEWS_ROWS); i++) {
    subarray[i] = reviews.slice((i * REVIEWS_ROWS), (i * REVIEWS_ROWS) + REVIEWS_ROWS);
  }
  return subarray;
};

const MovieReviews = ({id}) => {
  const [reviews, isLoading] = useAPI(`/comments/${id}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const reviewList = getListReview(reviews);

  return reviews.length !== 0
    ? <div className="movie-card__reviews movie-card__row">
      {reviewList.map((reviews2, i) =>
        (<div key={`row-${i}`} className="movie-card__reviews-col">
          {reviews2.map((rev) => <MovieReview key={`review-${rev.id}`} review={rev}></MovieReview>)}
        </div>)
      )}
    </div>
    : <p className="review__text">There are no reviews for this film yet. You can be the first.</p>;
};

MovieReviews.propTypes = {
  id: PropTypes.number.isRequired
};

export default MovieReviews;
