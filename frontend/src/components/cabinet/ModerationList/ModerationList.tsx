import {FC, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, Grid, Typography} from "@mui/material";
import {AssignmentTurnedIn} from "@mui/icons-material";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {recipeActions} from "../../../redux";
import {Recipe} from "../../Recipe/Recipe";
import {RecipeSkeleton} from "../../Skeletons";
import {MyPagination} from "../../MyPagingation/MyPagination";

const ModerationList: FC = () => {
	const dispatch = useAppDispatch();
	const {list, loading, error} = useAppSelector(state => state.recipeReducer);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		dispatch(recipeActions.getNotModerated(searchParams.get("page")));
	}, [dispatch, searchParams]);

	return (
		<Box sx={{display: "flex", flexDirection: "column", flexGrow: 1, gap: 3}}>
			<Box sx={{display: "flex", alignItems: "center", gap: 1, mb: 2}}>
				<AssignmentTurnedIn color="primary" />
				<Typography variant="h5" fontWeight="bold">
					Recipes for Moderation
				</Typography>
			</Box>

			<Grid container spacing={3}>
				{
					error && (
						<Grid item xs={12}>
							<Typography color="error" textAlign="center" variant="h6">
								Error loading recipes
							</Typography>
						</Grid>
					)
				}
				{
					!loading && !error && list.recipes.length === 0 && (
						<Grid item xs={12}>
							<Box sx={{
								p: 4,
								textAlign: "center",
								bgcolor: "background.paper",
								borderRadius: 2,
								boxShadow: 1
							}}>
								<Typography variant="h6" color="text.secondary">
									No recipes found for moderation.
								</Typography>
							</Box>
						</Grid>
					)
				}
				{
					!loading && !error &&
					list.recipes.map(recipe => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={recipe._id} sx={{display: "flex"}}>
							<Recipe showModerateButton={true} recipe={recipe} />
						</Grid>
					))
				}
				{
					loading && !error &&
					[...Array(8).keys()].map((number, index) => (
						<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
							<RecipeSkeleton />
						</Grid>
					))
				}
			</Grid>
			{list.recipes.length > 0 && (
				<Box sx={{mt: "auto", pt: 4, display: "flex", justifyContent: "center"}}>
					<MyPagination count={list.count} />
				</Box>
			)}
		</Box>
	);
};

export {ModerationList};
