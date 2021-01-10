import React from 'react';
import { Button, makeStyles } from '@material-ui/core';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { MovieDetails } from '../components/movie-details/MovieDetails';
// eslint-disable-next-line import/named
import { SecondSearch } from '../components/second-search/SecondSearch';
import { refreshSettings } from '../redux/actions';

const useStyles = makeStyles(() => ({
	button: {
		marginTop: '40px',
		backgroundColor: '#00008B',
		maxHeight: 50,
	},
	titleButton: {
		color: '#c5d9d7',
	},
}));

export const Details = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();
	return (
		<>
			<Button
				className={classes.button}
				color="primary"
				variant="outlined"
				onClick={() => {
					history.push('/');
					dispatch(refreshSettings());
				}}
			>
				<p className={classes.titleButton}>На главную</p>
			</Button>
			<SecondSearch />
			<MovieDetails />
		</>
	);
};
