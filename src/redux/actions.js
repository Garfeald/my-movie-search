export const searchMovies = (searchValue) => ({
	type: 'SEARCH_MOVIE',
	payload: searchValue,
});

export const fetchMovies = (searchValue) => ({
	type: 'FETCH_MOVIE',
	payload: searchValue,
});

export const requestMovies = () => ({
	type: 'REQUEST_MOVIES',
});

export const moviesRequested = (movies) => ({
	type: 'MOVIES_REQUESTED',
	payload: movies,
});

export const movieChosen = (id) => ({
	type: 'MOVIE_CHOSEN',
	payload: id,
});

export const requestMovieDetails = () => ({
	type: 'REQUEST_MOVIE_DETAILS',
});

export const refreshSettings = () => ({
	type:	'REFRESH_SETTINGS',
});

export const movieDetailsRequested = (movieDetails) => ({
	type: 'MOVIE_DETAILS_REQUESTED',
	payload: movieDetails,
});
