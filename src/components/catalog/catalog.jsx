import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import {QuantityFilmsOnPage} from '../../const';
import {getFilteredFilms} from '../../utils/common';
import GenresList from '../genres-list/genres-list';
import MoviesList from '../movies-list/movies-list';

const Catalog = () => {
  const activeGenre = useSelector((state) => state.LOCAL.activeGenre);
  const films = useSelector((state) => state.DATA.films);

  const [quantityFilms, setQuantityFilms] = useState(QuantityFilmsOnPage.MAIN);

  const filteredFilms = getFilteredFilms(activeGenre, films);

  const getButtonShowMore = () => {
    return quantityFilms <= filteredFilms.length
      ? <div className="catalog__more">
        <button className="catalog__button" type="button" onClick={() => setQuantityFilms((prevQuantityFilms) => prevQuantityFilms + QuantityFilmsOnPage.MAIN)} >Show more</button>
      </div> : ``;
  };

  return <section className="catalog">
    <h2 className="catalog__title visually-hidden">Catalog</h2>

    <GenresList/>

    <MoviesList quantity={quantityFilms} films={filteredFilms}/>

    {getButtonShowMore()}
  </section>;
};

export default Catalog;
