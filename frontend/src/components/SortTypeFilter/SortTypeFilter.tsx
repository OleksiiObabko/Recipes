import {FC, useEffect, useState} from "react";
import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

const SortTypeFilter: FC = () => {
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const [sortType, setSortType] = useState<string>("-1");

	useEffect(() => {
		const sortTypeInQuery: string | null = query.get("sortType");
		if (sortTypeInQuery) {
			setSortType(sortTypeInQuery);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event: SelectChangeEvent) => {
		const newValue: string = event.target.value;
		setSortType(newValue);
		query.set("sortType", newValue);
		navigate({search: query.toString()});
	};

	return (
		<FormControl fullWidth size="small">
			<InputLabel>Order</InputLabel>
			<Select
				value={sortType}
				label="Order"
				onChange={handleChange}
				sx={{borderRadius: 2}}
			>
				<MenuItem value="-1">Descending</MenuItem>
				<MenuItem value="1">Ascending</MenuItem>
			</Select>
		</FormControl>
	);
};

export {SortTypeFilter};
