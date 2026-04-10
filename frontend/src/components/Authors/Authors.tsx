import {FC, useLayoutEffect} from "react";
import {useSearchParams} from "react-router-dom";
import {Box, Grid} from "@mui/material";

import {authorActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {IAuthorsQuery} from "../../interfaces";
import {Author} from "../Author/Author";
import {MyPagination} from "../MyPagingation/MyPagination";
import {AuthorSkeleton} from "../Skeletons";

const Authors: FC = () => {
	const dispatch = useAppDispatch();
	const {list, loading, error} = useAppSelector(state => state.authorReducer);
	const [searchParams] = useSearchParams();

	useLayoutEffect(() => {
		let newQuery: IAuthorsQuery = {};

		for (const [key, value] of searchParams.entries()) {
			newQuery = {...newQuery, [key]: value};
		}

		dispatch(authorActions.getByQuery(newQuery));
	}, [dispatch, searchParams]);

	return (
		<Box sx={{display: "flex", flexDirection: "column", flexGrow: 1}}>
			<Grid container spacing={3}>
				{
					error && <h2>ERROR</h2>
				}
				{!loading && !error &&
					list.authors.map(author =>
						<Author author={author} key={author._id} />
					)
				}
				{loading && !error &&
					[...Array(8).keys()].map((number, index) =>
						<AuthorSkeleton key={index} />
					)
				}
			</Grid>
			<Box sx={{mt: 4, display: "flex", justifyContent: "center"}}>
				<MyPagination count={list.count} />
			</Box>
		</Box>
	);
};

export {Authors};
