import {FC} from "react";
import {Box, Button, Stack, Typography, Card} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import ClearIcon from '@mui/icons-material/Clear';

import {CategoryFilter} from "../CategoryFilter/CategoryFilter";
import {KitchenFilter} from "../kitchenFilter/KitchenFilter";
import {TitleFilter} from "../TitleFilter/TitleFilter";
import {IngredientsFilter} from "../IngredientsFilter/IngredientsFilter";
import {TimeFilter} from "../TimeFilter/TimeFilter";
import {ServingsFilter} from "../SevringsFilter/ServingsFilter";
import {SortTypeFilter} from "../SortTypeFilter/SortTypeFilter";
import {SortFilterRecipes} from "../SortFilterRecipes/SortFilterRecipes";

const RecipesFilters: FC = () => {
	const [query] = useSearchParams();
	const navigate = useNavigate();

	const handleClear = () => {
		const queryKeys: string[] = [];
		query.forEach((value, key) => {
			queryKeys.push(key);
		});
		for (const queryKey of queryKeys) {
			query.delete(queryKey);
		}
		navigate({search: query.toString()});
	};

	return (
		<Card sx={{position: "sticky", alignSelf: "flex-start", top: 0, left: 0, padding: 2, boxShadow: 3}}>
			<Typography variant="h6" sx={{mb: 2, textAlign: "center"}}>
				Filter Recipes
			</Typography>
			<Stack spacing={2} sx={{width: "100%", display: "flex", flexDirection: "column", rowGap: 2, mb: 2}}>
				<CategoryFilter />
				<KitchenFilter />
				<TitleFilter />
				<IngredientsFilter />
				<TimeFilter />
				<ServingsFilter />
				<SortFilterRecipes />
				<SortTypeFilter />
			</Stack>
			<Button
				disabled={!query.toString()}
				variant="contained"
				color="secondary"
				onClick={handleClear}
				startIcon={<ClearIcon />}
			>
				Clear all filters
			</Button>
		</Card>
	);
};

export {RecipesFilters};
