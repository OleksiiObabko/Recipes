import React, {FC, useEffect, useState} from "react";
import {Box, Button, ButtonGroup, Typography} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";
import {RemoveRounded, AddRounded} from "@mui/icons-material";

const ServingsFilter: FC = () => {
	const [value, setValue] = useState<number>(0);
	const [query] = useSearchParams();
	const navigate = useNavigate();

	useEffect(() => {
		setValue(Number(query.get("servings")) || 0);
	}, [query]);

	const handleInc = () => {
		setValue(prevState => prevState + 1);
	};

	const handleDec = () => {
		setValue(prevState => prevState - 1);
	};

	const handelSubmit = () => {
		if (value) {
			query.set("servings", value.toString());
		} else {
			query.delete("servings");
		}
		navigate({search: query.toString()});
	};

	return (
		<Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
			<ButtonGroup
				variant="outlined"
				size="small"
				sx={{
					'& .MuiButton-root': {
						borderRadius: 2,
						borderColor: 'rgba(0,0,0,0.12)',
					}
				}}
			>
				<Button 
					onClick={handleDec} 
					disabled={!value}
					sx={{minWidth: 40}}
				>
					<RemoveRounded fontSize="small" />
				</Button>
				<Box sx={{
					minWidth: 40, 
					display: 'flex', 
					alignItems: 'center', 
					justifyContent: 'center',
					borderTop: '1px solid rgba(0,0,0,0.12)',
					borderBottom: '1px solid rgba(0,0,0,0.12)',
					fontWeight: 600
				}}>
					{value || "0"}
				</Box>
				<Button 
					onClick={handleInc}
					sx={{minWidth: 40}}
				>
					<AddRounded fontSize="small" />
				</Button>
			</ButtonGroup>
			<Button 
				disabled={!value} 
				variant="contained" 
				size="small"
				onClick={handelSubmit}
				sx={{borderRadius: 2, textTransform: 'none', fontWeight: 600}}
			>
				Apply
			</Button>
		</Box>
	);
};

export {ServingsFilter};
