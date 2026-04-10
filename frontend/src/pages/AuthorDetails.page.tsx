import {FC, useEffect} from "react";
import {Backdrop, Box, CircularProgress, Container, Grid} from "@mui/material";
import {useParams} from "react-router-dom";

import {AuthorInfo, RecipesFilters, RecipesOfAuthor} from "../components";
import {useAppDispatch, useAppSelector} from "../hooks";
import {authorActions} from "../redux";

const AuthorDetailsPage: FC = () => {
	const {id} = useParams();
	const dispatch = useAppDispatch();
	const {author, loading, error} = useAppSelector(state => state.authorReducer);

	useEffect(() => {
		dispatch(authorActions.getById(id as string));
	}, [dispatch, id]);

	return (
		<Box sx={{bgcolor: "#f9f9f9", minHeight: "100vh", py: 4}}>
			<Container maxWidth={"xl"}>
				{
					loading &&
					<Backdrop
						sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
						open={loading}
					>
						<CircularProgress color="inherit" />
					</Backdrop>
				}
				{error && <h2>ERROR</h2>}
				{
					author &&
					<Box>
						<AuthorInfo author={author} />
						<Grid container spacing={4}>
							<Grid item xs={12} md={3}>
								<RecipesFilters />
							</Grid>
							<Grid item xs={12} md={9}>
								<RecipesOfAuthor />
							</Grid>
						</Grid>
					</Box>
				}
			</Container>
		</Box>
	);
};

export {AuthorDetailsPage};
