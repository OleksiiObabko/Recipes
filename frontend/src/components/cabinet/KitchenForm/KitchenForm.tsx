import {FC, SyntheticEvent, useEffect, useMemo, useState} from "react";
import {FieldError} from "react-hook-form";
import {Autocomplete, TextField} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../../hooks";
import {ICategory} from "../../../interfaces";
import {kitchenActions} from "../../../redux";

interface IProps {
	setValue: Function;
	errors: FieldError | undefined;
}

const KitchenForm: FC<IProps> = ({setValue, errors}) => {
	const dispatch = useAppDispatch();

	const {kitchens} = useAppSelector(state => state.kitchenReducer);
	const titles = useMemo(() => kitchens.map(kitchen => kitchen.title), [kitchens]);
	const [currentValue, setCurrentValue] = useState<string | null>(null);

	useEffect(() => {
		dispatch(kitchenActions.getByParams());
	}, [dispatch]);

	const handleChange = (event: SyntheticEvent, value: string): void => {
		if (value) {
			const category: ICategory | undefined = kitchens.find(kitchen => kitchen.title === value);
			setCurrentValue(value);
			setValue("kitchen", category?._id as string);
		} else {
			setCurrentValue(null);
			setValue("kitchen", "");
		}
	};

	return (
		<Autocomplete
			blurOnSelect
			loading={!kitchens.length}
			options={titles}
			value={currentValue}
			onInputChange={handleChange}
			sx={{
				'& .MuiOutlinedInput-root': {
					borderRadius: 2
				}
			}}
			renderInput={(params) => (
				<TextField
					error={!!errors}
					helperText={errors?.message}
					{...params}
					label="Kitchen"
					variant="outlined" />
			)}
		/>
	);
};

export {KitchenForm};
