import {ChangeEvent, FC, useEffect, useState} from "react";
import {IconButton, InputAdornment, TextField} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';

const NameFilter: FC = () => {
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const [currValue, setCurrValue] = useState<string>(query.get("name") || "");

	useEffect(() => {
		setCurrValue(query.get("name") || "");
	}, [query]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrValue(e.currentTarget.value);
	};

	const handleClick = () => {
		if (currValue) {
			query.set("name", currValue);
		} else {
			query.delete("name");
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
			label="User name"
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

export {NameFilter};
