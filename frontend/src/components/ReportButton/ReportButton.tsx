import {FC, useEffect, useState} from "react";
import {
	Backdrop,
	Box,
	Button, CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	IconButton,
	TextField,
	Tooltip,
	Typography
} from "@mui/material";
import {ReportProblem} from "@mui/icons-material";
import {Controller, SubmitHandler, useForm} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {useNavigate} from "react-router-dom";

import {reportValidator} from "../../validators";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {reportActions} from "../../redux";

interface IProps {
	authorId: string;
	isReport: Function;
}

interface IReport {
	text: string;
}

const ReportButton: FC<IProps> = ({authorId, isReport}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [open, setOpen] = useState(false);

	const {handleSubmit, control, reset} = useForm<IReport>({
		resolver: joiResolver(reportValidator),
		mode: "all"
	});
	const {loading, statusCode} = useAppSelector(state => state.reportReducer);
	const {loginAuthor} = useAppSelector(state => state.authReducer);

	const onSubmit: SubmitHandler<IReport> = ({text}) => {
		dispatch(reportActions.sendReport({authorId, text}));
		handleClose();
	};

	const handleOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	useEffect(() => {
		if (statusCode === 200) {
			isReport(true);
			reset();
		}
	}, [isReport, reset, statusCode]);

	return (
		<Box>
			<Backdrop
				sx={{color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1}}
				open={loading}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{
				loginAuthor ?
					<Tooltip title="Report Author">
						<IconButton onClick={handleOpen} sx={{ "&:hover": { color: "warning.main" } }}>
							<ReportProblem color="warning" />
						</IconButton>
					</Tooltip> :
					<Tooltip title="Login to report">
						<IconButton onClick={() => navigate("/login")} sx={{ "&:hover": { color: "warning.main" } }}>
							<ReportProblem color="warning" />
						</IconButton>
					</Tooltip>
			}
			<Dialog
				open={open}
				onClose={handleClose}
				PaperProps={{
					sx: { borderRadius: 3, p: 1, minWidth: { xs: "90%", sm: "400px" } }
				}}
			>
				<DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
					<ReportProblem color="warning" />
					<Typography variant="h6" fontWeight="700">Report Author</Typography>
				</DialogTitle>
				<DialogContent>
					<DialogContentText sx={{ mb: 2 }}>
						Please provide details about why you are reporting this author. Our moderators will review it as soon as possible.
					</DialogContentText>
					<Box component="form" id="report-form" noValidate onSubmit={handleSubmit(onSubmit)}>
						<Controller
							name={"text"}
							control={control}
							render={({field: {onChange, value}, fieldState: {error}}) => (
								<TextField
									error={!!error}
									helperText={error?.message}
									onChange={onChange}
									value={value || ""}
									autoFocus
									required
									margin="dense"
									label="Reason for report"
									placeholder="Describe the issue..."
									type="text"
									fullWidth
									multiline
									rows={4}
									variant="outlined"
									sx={{ mt: 1 }}
								/>
							)}
						/>
					</Box>
				</DialogContent>
				<DialogActions sx={{ p: 2 }}>
					<Button onClick={handleClose} color="inherit">Cancel</Button>
					<Button
						form="report-form"
						type="submit"
						variant="contained"
						color="warning"
						sx={{ borderRadius: 2, px: 3 }}
					>
						Send Report
					</Button>
				</DialogActions>
			</Dialog>
		</Box>
	);
};

export {ReportButton};
