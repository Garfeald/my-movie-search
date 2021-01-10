import { combineReducers } from 'redux';
// eslint-disable-next-line import/named
import { moviesReducer } from './moviesReducer';

export const rootReducer = combineReducers({
	movies: moviesReducer,
});
