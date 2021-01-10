import React from 'react';
import { TableRow, TableCell } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { movieChosen } from '../../redux/actions';

const useStyles = makeStyles(() => ({
	row: {
		cursor: 'pointer',
		'&:hover': {
			backgroundColor: '#F0FFFF',
		},
	},
	img: {
		width: '100px',
		height: '100px',
		objectFit: 'contain',
	},
}));

export const Movie = (movie) => {
	const dispatch = useDispatch();
	const history = useHistory();
	const onClick = (e) => {
		const { id } = e.currentTarget.dataset;
		dispatch(movieChosen(id));
		history.push(`/movies/${id}`);
	};
	const {
		Poster, Title, imdbID, Year, Type,
	} = movie;

	const classes = useStyles();
	return (
		<TableRow className={classes.row} data-id={imdbID} onClick={onClick}>
			<TableCell>{<img src={Poster} alt="poster" className={classes.img} /> || ''}</TableCell>
			<TableCell>{Title || ''}</TableCell>
			<TableCell>{Year || ''}</TableCell>
			<TableCell>{Type || ''}</TableCell>
		</TableRow>
	);
};
