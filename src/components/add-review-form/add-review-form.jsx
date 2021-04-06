import React, {Fragment, useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {postReview} from '../../store/api-actions';
import {CONNECTION_ERROR, STARS_QUANTITY, StartState, StatusCodes, TextLenghtValid} from '../../const';
import {useHistory} from 'react-router-dom';

const AddReviewForm = () => {
  const activeFilm = useSelector((state) => state.LOCAL.activeFilm);
  const {id} = activeFilm;

  const dispatch = useDispatch();

  const onSubmit = (data) => {
    return dispatch(postReview(data));
  };

  const history = useHistory();

  const [isDisabled, setDisabled] = useState(true);

  const [error, setError] = useState(false);

  const [starRating, setStarRating] = useState(StartState.STAR_RATING);
  const [reviewText, setReviewText] = useState(StartState.REVIEW_TEXT);

  useEffect(() => {
    setDisabled(!isDataValid());
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

    setDisabled(true);
    setError(false);

    onSubmit({
      id,
      starRating,
      reviewText
    })
    .then(() => {
      history.push(`/films/${id}`);
    })
    .catch((err) => {
      getResponseErrorMessage(err);
      setDisabled(false);
    });
  };

  const getResponseErrorMessage = (err) => {
    if (err.message === CONNECTION_ERROR) {
      setError(`Internet connection error. We have not submitted your review. Check the connection.`);
    } else if (err.response.status === StatusCodes.BAD_REQUEST) {
      setError(`We didn't like your review. Take it back.`);
    } else if (err.response.status >= StatusCodes.SERVER_ERROR_FIRST && err.response.status <= StatusCodes.SERVER_ERROR_LAST) {
      setError(`We have something broken on server. Your review has not been sent. Try to repeat later.`);
    }
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
        <button className="add-review__btn" type="submit" disabled={isDisabled}>Post</button>
      </div>

    </div>
    {error ? <div>{error}</div> : ``}
  </form>;
};

export default AddReviewForm;
