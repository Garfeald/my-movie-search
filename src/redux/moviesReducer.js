const initialState = {
	searchValue: '',
	loading: false,
	movies: null,
	error: '',
	chosenMovie: '',
	movieDetails: null,
};
export const moviesReducer = (state = initialState, action) => {
	switch (action.type) {
	case 'SEARCH_MOVIE':
		return {
			...state,
			searchValue: action.payload,
		};
	case 'REQUEST_MOVIES':
		return {
			...state,
			loading: true,
		};
	case 'MOVIES_REQUESTED':
		return {
			...state,
			loading: false,
			movies: [action.payload],
		};
	case 'REQUEST_FAILED':
		return {
			...state,
			loading: false,
			error: action.payload,
		};
	case 'MOVIE_CHOSEN':
		return {
			...state,
			chosenMovie: action.payload,
		};
	case 'REQUEST_MOVIE_DETAILS':
		return {
			...state,
			loading: true,
		};
	case 'REFRESH_SETTINGS':
		return {
			searchValue: '',
			loading: false,
			movies: null,
			error: '',
			chosenMovie: '',
			movieDetails: null,
		};
	case 'MOVIE_DETAILS_REQUESTED':
		return {
			...state,
			loading: false,
			movieDetails: action.payload,
		};
	default:
		return state;
	}
};
