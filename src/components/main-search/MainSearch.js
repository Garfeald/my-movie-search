import React, { useEffect, useState } from 'react';
import {
	TextField, CircularProgress, makeStyles, AppBar, Typography,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { useHistory } from 'react-router';
import { searchMovies } from '../../redux/actions';
import { api } from '../api/api';

const useStyles = makeStyles(() => ({
	root: {
		width: '100%',
		marginTop: '90px',
		backgroundColor: '#F0FFFF',
	},
	title: {
		flexGrow: 1,
		height: 50,
		textAlign: 'center',
		paddingTop: 10,
		fontSize: 32,
		fontFamily: 'URW Chancery L, cursive',
	},
}));

export const MainSearch = () => {
	const [inputValue, setInputValue] = useState('');
	const [options, setOptions] = useState([]);
	const [loading, setLoading] = useState(false);
	const [open, setOpen] = useState(false);
	const history = useHistory();
	const dispatch = useDispatch();
	const onChange = (e) => {
		setInputValue(e.target.value);
	};

	const onChangeField = (e) => {
		const { id } = e.currentTarget.dataset;
		dispatch(searchMovies(inputValue));
		history.push(`/movies/${id}`);
	};
	useEffect(() => {
		setLoading(true);
		if (inputValue.length > 2) {
			api.fetch.fetchMovies(inputValue)
				.then((res) => res.data)
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

	const classes = useStyles();
	return (
		<div className={classes.root}>
			<AppBar>
				<Typography variant="h6" className={classes.title}>
					myMovieSearch
				</Typography>
			</AppBar>
			<Autocomplete
				onChange={onChangeField}
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				getOptionSelected={(option, inputValues) => option.Title === inputValues.name}
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
									{loading ? <CircularProgress color="inherit" size={10} /> : null}
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
