import React, {Fragment, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {postReview} from '../../store/api-actions';
import PropTypes from 'prop-types';
import {PROP_TYPES_FILM, STARS_QUANTITY, StartState, TextLenghtValid} from '../../const';
import {getActiveFilm} from '../../store/local-state/selectors';

const AddReviewForm = ({activeFilm, onSubmit, onButtonClick}) => {
  const {id} = activeFilm;
  const [statusForm, setStatusForm] = useState({
    isDisabled: true,
    isError: false
  });
  const [starRating, setStarRating] = useState(StartState.STAR_RATING);
  const [reviewText, setReviewText] = useState(StartState.REVIEW_TEXT);

  useEffect(() => {
    setStatusForm({
      ...statusForm,
      isDisabled: !isDataValid()});
  }, [starRating, reviewText]);

  const isTextareaValid = () => {
    return reviewText.length >= TextLenghtValid.MIN && reviewText.length <= TextLenghtValid.MAX;
  };

  const isRaitingValid = () => {
    return starRating !== StartState.STAR_RATING;
  };

  const isDataValid = () => {
    return isTextareaValid() && isRaitingValid();
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    setStatusForm({
      isDisabled: true,
      isError: false});
    onSubmit({
      id,
      starRating,
      reviewText
    })
    .then(() => {
      onButtonClick(`/films/${id}`);
    })
    .catch(() => {
      setStatusForm({
        isDisabled: !isDataValid(),
        isError: true});
    });
  };

  return <form action="#" className="add-review__form" onSubmit={handleSubmit}>
    <div className="rating">
      <div className="rating__stars">
        {new Array(STARS_QUANTITY).fill(null).map((_, index) => {
          const starNumber = index + 1;
          return (
            <Fragment key={`rating-${starNumber}`}>
              <input className="rating__input" id={`star-${starNumber}`} type="radio" name="rating" value={starNumber} onChange={({target}) => {
                setStarRating(target.value);
              }}/>
              <label className="rating__label" htmlFor={`star-${starNumber}`}>Rating {starNumber}</label>
            </Fragment>
          );
        })}
      </div>
    </div>

    <div className="add-review__text">
      <textarea className="add-review__textarea" name="review-text" id="review-text" placeholder="Review text" value={reviewText} onChange={({target}) => {
        setReviewText(target.value);
      }}/>
      <div className="add-review__submit">
        <button className="add-review__btn" type="submit" disabled={statusForm.isDisabled}>Post</button>
      </div>

    </div>
    {statusForm.isError ? <div>We have not submitted your review. Try to repeat</div> : ``}
  </form>;
};

AddReviewForm.propTypes = {
  activeFilm: PROP_TYPES_FILM,
  onSubmit: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  activeFilm: getActiveFilm(state)
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit(data) {
    return dispatch(postReview(data));
  }
});

export {AddReviewForm};

export default connect(mapStateToProps, mapDispatchToProps)(AddReviewForm);
