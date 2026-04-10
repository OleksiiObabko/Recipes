import {ChangeEvent, FC, KeyboardEvent, useEffect, useState} from "react";
import {Chip, FormControl, TextField, Box, InputAdornment, IconButton} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

const IngredientsFilter: FC = () => {
	const navigate = useNavigate();
	const [values, setValues] = useState<string[]>([]);
	const [currValue, setCurrValue] = useState<string>("");
	const [searchParams] = useSearchParams();

	useEffect(() => {
		const prev = searchParams.get("ingredients");
		setValues(prev ? prev.split(",") : []);
	}, [searchParams]);

	const addIngredient = (ingredient: string) => {
		if (ingredient) {
			const newValues = [...values, ingredient];
			searchParams.set("ingredients", newValues.join(","));
			navigate({search: searchParams.toString()});
			setCurrValue("");
		}
	}

	const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			addIngredient(currValue);
		} else if (e.key === "Backspace" && !currValue && values.length) {
			const newValues = values.slice(0, -1);

			if (newValues.length) {
				searchParams.set("ingredients", newValues.join(","));
			} else {
				searchParams.delete("ingredients");
			}

			navigate({search: searchParams.toString()});
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrValue(e.currentTarget.value);
	};

	const handleDelete = (index: number) => {
		const newValues = [...values];
		newValues.splice(index, 1);

		if (newValues.length) {
			searchParams.set("ingredients", newValues.join(","));
		} else {
			searchParams.delete("ingredients");
		}

		navigate({search: searchParams.toString()});
	};

	return (
		<Box>
			<TextField
				fullWidth
				size="small"
				value={currValue}
				label="Ingredients"
				placeholder="Add ingredient..."
				variant="outlined"
				onChange={handleChange}
				onKeyDown={handleKeyUp}
				InputProps={{
					endAdornment: (
						<InputAdornment position="end">
							<IconButton onClick={() => addIngredient(currValue)} edge="end" size="small" color="primary">
								<AddIcon />
							</IconButton>
						</InputAdornment>
					),
					sx: {borderRadius: 2}
				}}
				sx={{mb: values.length ? 1 : 0}}
			/>
			{!!values.length &&
				<Box
					sx={{
						display: "flex",
						flexWrap: "wrap",
						gap: 1,
						mt: 1
					}}
				>
					{values.map((item, index) => (
						<Chip
							key={index}
							size="small"
							label={item}
							onDelete={() => handleDelete(index)}
							sx={{borderRadius: 1}}
						/>
					))}
				</Box>
			}
		</Box>
	);
};

export {IngredientsFilter};
