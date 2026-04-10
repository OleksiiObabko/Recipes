import {ChangeEvent, FC, useState} from "react";
import {Box, Button, Chip, TextField, Typography, InputAdornment, IconButton} from "@mui/material";
import {Add} from "@mui/icons-material";
import {FieldError, Merge, UseControllerProps} from "react-hook-form";

import {ICreateRecipe} from "../../../interfaces";

interface IProps extends UseControllerProps<ICreateRecipe> {
	setValue: Function;
	errors: Merge<FieldError, (FieldError | undefined)[]> | undefined;
}

const IngredientsForm: FC<IProps> = ({setValue, errors}) => {
	const [ingredients, setIngredients] = useState<string[]>([]);
	const [currentValue, setCurrentValue] = useState<string>("");

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setCurrentValue(e.currentTarget.value);
	};

	const handleAddIngredient = () => {
		if (!currentValue.trim()) return;
		const newIngredients = [...ingredients, currentValue.trim()];
		setIngredients(newIngredients);
		setValue("ingredients", newIngredients, {shouldValidate: true});
		setCurrentValue("");
	};

	const handleDelIngredient = (index: number) => {
		const newIngredients = ingredients.filter((_, i) => i !== index);
		setIngredients(newIngredients);
		setValue("ingredients", newIngredients, {shouldValidate: true});
	};

	return (
		<Box sx={{display: "flex", flexDirection: "column", rowGap: 2}}>
			<Box sx={{display: "flex", flexWrap: "wrap", gap: 1, minHeight: ingredients.length ? "auto" : 0}}>
				{ingredients.map((ingredient, index) => (
					<Chip
						key={index}
						label={ingredient}
						onDelete={() => handleDelIngredient(index)}
						color={errors && (errors as any)[index] ? "error" : "primary"}
						variant="outlined"
						sx={{borderRadius: 2, fontWeight: 500}}
					/>
				))}
			</Box>
			
			<TextField
				fullWidth
				value={currentValue}
				onChange={handleChange}
				onKeyPress={(e) => {
					if (e.key === 'Enter') {
						e.preventDefault();
						handleAddIngredient();
					}
				}}
				placeholder="e.g. 2 eggs"
				label="Add Ingredient"
				variant="outlined"
				error={!!errors && !ingredients.length}
				helperText={!!errors && !ingredients.length ? "At least one ingredient is required" : ""}
				InputProps={{
					sx: { borderRadius: 2 },
					endAdornment: (
						<InputAdornment position="end">
							<IconButton 
								onClick={handleAddIngredient} 
								disabled={!currentValue.trim()}
								color="primary"
								edge="end"
							>
								<Add />
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
		</Box>
	);
};

export {IngredientsForm};
