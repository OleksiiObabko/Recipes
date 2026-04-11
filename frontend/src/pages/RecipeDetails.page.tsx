import {FC, useEffect} from "react";
import {Box, CircularProgress, Container, Grid, Paper, Typography, Divider} from "@mui/material";
import {useParams} from "react-router-dom";
import {useInView} from "react-intersection-observer";

import {useAppDispatch, useAppSelector} from "../hooks";
import {recipeActions} from "../redux";
import {
	CarouselSlider,
	Characteristic,
	RecipeInfo,
	Ingredients,
	Reviews,
	Stages,
	CreateReviewForm
} from "../components";

const RecipeDetailsPage: FC = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const [ref, inView] = useInView({triggerOnce: true});
	const {recipe, loading, error} = useAppSelector(state => state.recipeReducer);

	useEffect(() => {
		dispatch(recipeActions.getById(id as string));
		
		return () => {
			dispatch(recipeActions.clearRecipe());
		};
	}, [dispatch, id]);

	return (
		<Box sx={{bgcolor: "#f8f9fa", minHeight: "100vh", py: 4}}>
			<Container maxWidth="lg">
				{loading && (
					<Box sx={{display: "flex", justifyContent: "center", py: 10}}>
						<CircularProgress />
					</Box>
				)}
				{error && (
					<Box sx={{textAlign: "center", py: 10}}>
						<Typography color="error" variant="h5">
							Error loading recipe details. Please try again later.
						</Typography>
					</Box>
				)}
				{recipe && (
					<Grid container spacing={4}>
						{/* Left Column: Media and Main Details */}
						<Grid item xs={12} md={7}>
							<RecipeInfo
								_id={recipe._id}
								inBook={recipe.inBook}
								title={recipe.title}
								description={recipe.description}
								rating={recipe.rating}
								reviewsCount={recipe.reviewsCount}
								bookCount={recipe.bookCount}
								creator={recipe.creator}
								createdAt={recipe.createdAt}
							/>
							<CarouselSlider gallery={recipe.gallery} />
							<Characteristic
								kitchen={recipe.kitchen}
								category={recipe.category}
								servings={recipe.servings}
								time={recipe.time}
							/>
							<Divider sx={{my: 4}} />
							<Stages stages={[...recipe.stages].sort((a, b) => a.number - b.number)} />
						</Grid>

						{/* Right Column: Ingredients and Reviews */}
						<Grid item xs={12} md={5}>
							<Box sx={{position: {md: "sticky"}, top: 24}}>
								<Ingredients ingredients={recipe.ingredients} />
								<Paper elevation={0} sx={{p: 3, borderRadius: 3, border: "1px solid", borderColor: "divider", bgcolor: "background.paper"}}>
									<Typography variant="h5" fontWeight={700} gutterBottom sx={{mb: 3, color: "primary.main"}}>
										Leave a Review
									</Typography>
									<CreateReviewForm _id={recipe._id} />
								</Paper>
							</Box>
						</Grid>

						{/* Bottom: All Reviews */}
						<Grid item xs={12}>
							<Divider sx={{my: 6}} />
							<Box ref={ref} sx={{mt: 2}}>
								{inView && <Reviews recipeId={recipe._id} reviewsCount={recipe.reviewsCount} />}
							</Box>
						</Grid>
					</Grid>
				)}
			</Container>
		</Box>
	);
};

export {RecipeDetailsPage};
