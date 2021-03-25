import {NameSpace} from '../root-reducer';

export const getActiveGenre = (state) => state[NameSpace.LOCAL].activeGenre;
export const getActiveFilm = (state) => state[NameSpace.LOCAL].activeFilm;
