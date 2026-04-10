import {FC, useEffect, useState} from "react";
import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	TextField,
	DialogContentText,
	DialogTitle,
	IconButton,
	Tooltip,
	Typography
} from "@mui/material";
import {RemoveCircle} from "@mui/icons-material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";

import {blockActions} from "../../redux";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {blockValidator} from "../../validators";

interface IProps {
	authorId: string;
	isBlock: Function;
}

interface IBlock {
	days: number;
}

const BlockButton: FC<IProps> = ({authorId, isBlock}) => {
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);

	const {loading, statusCode} = useAppSelector(state => state.blockReducer);

	const {handleSubmit, control, reset} = useForm<IBlock>({
		resolver: joiResolver(blockValidator),
		mode: "all"
	});
	const onSubmit: SubmitHandler<IBlock> = ({days}) => {
		dispatch(blockActions.blockAuthor({authorId, days}));
		handleClose();
		reset();
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (statusCode === 200) {
			isBlock(true);
			reset();
		}
	}, [isBlock, reset, statusCode]);

	return (
		<Box>
			<Backdrop
				sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Tooltip title="Block Author (Admin)">
				<IconButton onClick={handleOpen} sx={{ "&:hover": { color: "error.main" } }}>
					<RemoveCircle color="error" />
				</IconButton>
			</Tooltip>
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					sx: { borderRadius: 3, p: 1, minWidth: { xs: "90%", sm: "400px" } }
				}}
			>
				<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<RemoveCircle color="error" />
					<Typography variant="h6" fontWeight="700">Block Author</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ mb: 2 }}>
						Enter the number of days you want to block this author for. They will be unable to perform most actions until the block expires.
					</DialogContentText>
					<Box component="form" id="block-form" noValidate onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name={"days"}
							control={control}
							render={({field: {onChange, value}, fieldState: {error}}) => (
								<TextField
									type="number"
									error={!!error}
									helperText={error?.message}
									onChange={onChange}
									value={value || ""}
									autoFocus
									required
									margin="dense"
									label="Duration (days)"
									placeholder="e.g. 7"
									fullWidth
									variant="outlined"
									InputProps={{ inputProps: { min: 1 } }}
									sx={{ mt: 1 }}
								/>
							)}
						/>
					</Box>
				</DialogContent>
				<DialogActions sx={{ p: 2 }}>
					<Button onClick={handleClose} color="inherit">Cancel</Button>
					<Button
						form="block-form"
						type="submit"
						variant="contained"
						color="error"
						sx={{ borderRadius: 2, px: 3 }}
					>
						Block Author
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export {BlockButton};
