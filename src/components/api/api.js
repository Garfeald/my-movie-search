const axios = require('axios');

export const api = {
	fetch: {
		fetchMovies: async (searchValue) => axios.get(`http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.API_KEY}&`),
		fetchMovieDetails: async (id) => axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${process.env.API_KEY}&`),
	},
};
