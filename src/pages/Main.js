import React from 'react';
// eslint-disable-next-line import/named
import { MainSearch } from '../components/main-search/MainSearch';
import { MovieTable } from '../components/movie-table/MovieTable';

export const Main = () => (
	<>
		<MainSearch />
		<MovieTable />
	</>
);
