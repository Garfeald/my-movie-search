import React from 'react';
import { useSelector } from 'react-redux';
import {
	BrowserRouter as Router, Redirect, Route, Switch,
} from 'react-router-dom';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Main, Details } from '../../pages';

const useStyles = makeStyles(() => ({
	root: {
		height: '100%',
		minHeight: '150vh',
	},
}));

export const AppRouter = () => {
	const classes = useStyles();
	const chosenMovie = useSelector((state) => state && state.movies && state.movies.chosenMovie);
	return (
		<Router>
			<div className={classes.root}>
				<Container>
					<Switch>
						<Route exact path="/" component={Main} />
						<Route
							exact
							path={`/movies/:${chosenMovie}`}
							component={Details}
						/>
						<Redirect from="*" to="/" />
					</Switch>
				</Container>
			</div>
		</Router>
	);
};
