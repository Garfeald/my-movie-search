import {
	takeEvery, put, call, select, all,
} from 'redux-saga/effects';
import {
	requestMovies, moviesRequested, requestMovieDetails, movieDetailsRequested,
} from './actions';
// eslint-disable-next-line no-unused-vars
import { api } from '../components/api/api';

const getSearchValue = (state) => state.movies.searchValue;

const getId = (state) => state.movies.chosenMovie;

function* movieWorker() {
	yield put(requestMovies());
	const searchValue = yield select(getSearchValue);
	try {
		const res = yield call(api.fetch.fetchMovies, searchValue);
		if (res.status === 200) {
			yield put(moviesRequested(res.data));
		}
	} catch (e) {
		yield put({ type: 'REQUEST_FAILED', payload: e.toString() });
	}
}

function* movieWatcher() {
	yield takeEvery('SEARCH_MOVIE', movieWorker);
}

function* movieDetailsWorker() {
	yield put(requestMovieDetails());
	const chosenMovie = yield select(getId);
	try {
		const res = yield call(api.fetch.fetchMovieDetails, chosenMovie);
		if (res.status === 200) {
			yield put(movieDetailsRequested(res.data));
		}
	} catch (e) {
		yield put({ type: 'REQUEST_FAILED', payload: e.toString() });
	}
}

function* movieDetailsWatcher() {
	yield takeEvery('MOVIE_CHOSEN', movieDetailsWorker);
}

export function* rootSaga() {
	yield all([
		movieWatcher(),
		movieDetailsWatcher(),
	]);
}
