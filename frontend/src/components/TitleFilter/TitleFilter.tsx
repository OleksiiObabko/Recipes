import {ChangeEvent, FC, useEffect, useState} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const TitleFilter: FC = () => {
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const [currValue, setCurrValue] = useState<string>(query.get("title") || "");

	useEffect(() => {
		setCurrValue(query.get("title") || "");
	}, [query]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrValue(e.currentTarget.value);
	};

	const handleClick = () => {
		if (currValue) {
			query.set("title", currValue);
		} else {
			query.delete("title");
		}
		navigate({search: query.toString()});
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === 'Enter') {
			handleClick();
		}
	};

	return (
		<TextField
			fullWidth
			size="small"
			label="Recipe Title"
			value={currValue}
			variant="outlined"
			onChange={handleChange}
			onKeyPress={handleKeyPress}
			InputProps={{
				endAdornment: (
					<InputAdornment position="end">
						<IconButton onClick={handleClick} edge="end" size="small" color="primary">
							<SearchIcon />
						</IconButton>
					</InputAdornment>
				),
				sx: {borderRadius: 2}
			}}
		/>
	);
};

export {TitleFilter};
