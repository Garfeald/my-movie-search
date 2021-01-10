import React from 'react';
import {
	Card, CardMedia, CardContent, CircularProgress, Typography, makeStyles, Grid,
} from '@material-ui/core';
import { useSelector } from 'react-redux';

const useStyles = makeStyles(() => ({
	spinner: {
		margin: '50px auto',
		width: '200px',
	},
	cardContainer: {
		display: 'flex',
		maxWidth: '1500px',
		margin: '50px auto',
		backgroundColor: '#F0FFFF',
	},
	cardContent: {
		marginTop: 20,
		maxHeight: '500px',
	},
	typography: {
		wordBreak: 'break-word',
	},
	cardMedia: {
		width: '100%',
		height: '500px',
		marginTop: 20,
		borderRadius: '7px',
		backgroundSize: 'auto',
	},
}));

export const MovieDetails = () => {
	const { loading, movieDetails } = useSelector((state) => state && state.movies && state.movies);
	const classes = useStyles();
	return (
		<div>
			<hr style={{ color: '#F0FFFF' }} />
			{loading ? <div className={classes.spinner}><CircularProgress thickness="2" size="5px" /></div>
				: (
					<Card className={classes.cardContainer} variant="outlined">
						<Grid item lg={6} md={6} xs={12}>
							<CardMedia
								className={classes.cardMedia}
								image={movieDetails.Poster}
								title={movieDetails.Title}
							/>
						</Grid>
						<Grid item lg={6} md={6} xs={12}>
							<CardContent className={classes.cardContent}>
								{Object.entries(movieDetails).map(([key, value]) => (
									<>
										<Typography className={classes.typography} variant="body2" color="textSecondary" component="p">
											{
												key !== 'Poster' && key !== 'Response'
													? `${key}: ${value}`
													: null
											}
										</Typography>
									</>
								))}
							</CardContent>
						</Grid>
					</Card>
				)}
		</div>
	);
};
