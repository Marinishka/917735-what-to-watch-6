import {NameSpace} from '../root-reducer';

export const getFilms = (state) => state[NameSpace.DATA].films;
export const getPreviewFilm = (state) => state[NameSpace.DATA].previewFilm;
export const getAllGenres = (state) => state[NameSpace.DATA].allGenres;
export const getLoadedFilmsStatus = (state) => state[NameSpace.DATA].isFilmsLoaded;
export const getLoadedPreviewFolmStatus = (state) => state[NameSpace.DATA].isPreviewFilmLoaded;
