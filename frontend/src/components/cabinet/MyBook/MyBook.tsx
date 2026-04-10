import {FC, useEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, Grid, Typography} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {bookActions} from "../../../redux";
import {RecipeSkeleton} from "../../Skeletons";
import {MyPagination} from "../../MyPagingation/MyPagination";
import {Recipe} from "../../Recipe/Recipe";

const MyBook: FC = () => {
	const dispatch = useAppDispatch();
	const {myRecipes, loading, error} = useAppSelector(state => state.recipeReducer);
	const [searchParams] = useSearchParams();

	useEffect(() => {
		dispatch(bookActions.getMyBook(searchParams.get("page")));
	}, [dispatch, searchParams]);

	return (
		<Box sx={{display: "flex", flexDirection: "column", flexGrow: 1}}>
			<Grid container spacing={3}>
				{
					error && <h2>ERROR</h2>
				}
				{
					!loading && !error && !!myRecipes.recipes.length &&
					myRecipes.recipes.map(recipe =>
						<Recipe recipe={recipe} key={recipe._id} />
					)
				}
				{
					!loading && !error && !myRecipes.recipes.length &&
					<Grid item xs={12}>
						<Typography variant="h5" sx={{pt: 4, textAlign: "center", color: "text.secondary"}}>
							Your book is empty.
						</Typography>
					</Grid>
				}
				{
					loading && !error &&
					[...Array(8).keys()].map((number, index) =>
						<RecipeSkeleton key={index} />
					)
				}
			</Grid>
			<Box sx={{mt: 4, display: "flex", justifyContent: "center"}}>
				<MyPagination count={myRecipes.count} />
			</Box>
		</Box>
	);
};

export {MyBook};
