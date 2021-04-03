import React, {Fragment, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {postReview} from '../../store/api-actions';
import {STARS_QUANTITY, StartState, TextLenghtValid} from '../../const';
import {useHistory} from 'react-router-dom';

const AddReviewForm = () => {
  const activeFilm = useSelector((state) => state.LOCAL.activeFilm);
  const {id} = activeFilm;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    return dispatch(postReview(data));
  };

  const history = useHistory();

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

  const isRatingValid = () => {
    return starRating !== StartState.STAR_RATING;
  };

  const isDataValid = () => {
    return isTextareaValid() && isRatingValid();
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
      history.push(`/films/${id}`);
    })
    .catch(() => {
      setStatusForm({
        isDisabled: false,
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

export default AddReviewForm;
