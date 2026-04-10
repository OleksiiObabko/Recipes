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
import {SortFilterRecipes} from "../SortFilterRecipes/SortFilterRecipes";
import {SortTypeFilter} from "../SortTypeFilter/SortTypeFilter";

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
		<Card sx={{
			position: "sticky",
			alignSelf: "flex-start",
			top: 16,
			padding: 3,
			boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
			borderRadius: 4,
			width: 320,
			border: "1px solid rgba(0,0,0,0.05)"
		}}>
			<Typography variant="h5" sx={{mb: 3, fontWeight: 700, color: "primary.main", letterSpacing: "-0.5px"}}>
				Filters
			</Typography>
			<Stack spacing={3} sx={{mb: 3}}>
				<TitleFilter />
				<CategoryFilter />
				<KitchenFilter />
				<IngredientsFilter />
				
				<Box>
					<Typography variant="subtitle2" sx={{mb: 1, fontWeight: 600, color: "text.secondary"}}>
						Cooking Time (min)
					</Typography>
					<TimeFilter />
				</Box>

				<Box>
					<Typography variant="subtitle2" sx={{mb: 1, fontWeight: 600, color: "text.secondary"}}>
						Servings
					</Typography>
					<ServingsFilter />
				</Box>

				<Box sx={{pt: 2, borderTop: "1px solid rgba(0,0,0,0.05)"}}>
					<Typography variant="subtitle2" sx={{mb: 2, fontWeight: 600, color: "text.secondary"}}>
						Sorting
					</Typography>
					<Stack spacing={2}>
						<SortFilterRecipes />
						<SortTypeFilter />
					</Stack>
				</Box>
			</Stack>
			<Button
				fullWidth
				disabled={!query.toString()}
				variant="outlined"
				color="error"
				onClick={handleClear}
				startIcon={<ClearIcon />}
				sx={{borderRadius: 2, textTransform: "none", fontWeight: 600}}
			>
				Clear all filters
			</Button>
		</Card>
	);
};

export {RecipesFilters};
