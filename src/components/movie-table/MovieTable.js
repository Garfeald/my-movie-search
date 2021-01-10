import React from 'react';
import { useSelector } from 'react-redux';
import {
	CircularProgress, Table, TableBody,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Movie } from '../movie/Movie';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		margin: '0 auto',
	},
	spinner: {
		width: '250px',
		margin: '50px auto',
	},
}));

export const MovieTable = () => {
	const classes = useStyles();
	const { loading } = useSelector((state) => state && state.movies);
	let { movies } = useSelector((state) => state && state.movies);
	movies = movies && movies[0];
	const Search = movies?.Search;
	return (
		<>
			<div className={classes.root}>
				{loading ? <div className={classes.spinner}><CircularProgress thickness="2" size="10rem" /></div>
					: (
						<Table>
							{Search?.length
							&& <TableBody>{Search.map((movie) => <Movie {...movie} />)}</TableBody>}
						</Table>
					)}
			</div>
		</>
	);
};
