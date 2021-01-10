import React, { useState, useEffect } from 'react';
import { TextField, CircularProgress, makeStyles } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { movieChosen } from '../../redux/actions';
import { api } from '../api/api';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		margin: '60px auto',
		backgroundColor: '#F0FFFF',
	},
}));

export const SecondSearch = () => {
	const [open, setOpen] = useState(false);
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();
	const history = useHistory();
	const classes = useStyles();

	const onChange = (e) => {
		setInputValue(e.target.value);
	};

	const selectMovie = (...args) => {
		const [, value] = args;
		if (value && value.imdbID) {
			dispatch(movieChosen(value.imdbID));
			history.push(`/movies/${value.imdbID}`);
		}
	};

	useEffect(() => {
		setLoading(true);
		if (inputValue.length > 2) {
			api.fetch.fetchMovies(inputValue)
				.then((res) => res.status === 200 && res.data)
				.then((res) => {
					if (res.Search) {
						setOptions(res.Search);
					} else {
						setOptions([]);
					}
					setLoading(false);
				});
		}
	}, [inputValue]);

	useEffect(() => {
		if (!open) {
			setOptions([]);
			setLoading(false);
		}
	}, [open]);

	return (
		<div className={classes.root}>
			<Autocomplete
				onChange={((event, value) => selectMovie(event, value))}
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				getOptionSelected={(option, value) => option.Title === value.name}
				getOptionLabel={(option) => option.Title}
				options={options}
				loading={loading}
				loadingText="Загрузка..."
				renderInput={(params) => (
					<TextField
						{...params}
						value={inputValue}
						onChange={onChange}
						label="Поиск фильмов"
						variant="outlined"
						InputProps={{
							...params.InputProps,
							endAdornment: (
								<>
									{loading ? <CircularProgress color="inherit" size={5} /> : null}
									{params.InputProps.endAdornment}
								</>
							),
						}}
					/>
				)}
			/>
		</div>
	);
};
