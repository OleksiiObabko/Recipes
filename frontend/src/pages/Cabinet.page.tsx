import {FC} from "react";
import {Container, Grid, Box} from "@mui/material";
import {Outlet} from "react-router-dom";

import {UserNavigation, AdminNavigation} from "../components";
import {useAppSelector} from "../hooks";

const CabinetPage: FC = () => {
	const {loginAuthor} = useAppSelector(state => state.authReducer);

	return (
		<Box sx={{backgroundColor: "#fcfcfc", minHeight: "100vh", pt: 4, pb: 8}}>
			<Container maxWidth={"xl"}>
				<Grid container spacing={4}>
					<Grid item xs={12} md={3} lg={2}>
						{
							loginAuthor?.role === "admin" ?
								<AdminNavigation /> :
								<UserNavigation />
						}
					</Grid>
					<Grid item xs={12} md={9} lg={10}>
						<Box sx={{
							bgcolor: "background.paper",
							p: 4,
							borderRadius: 4,
							boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
							border: "1px solid rgba(0,0,0,0.05)",
							minHeight: "60vh"
						}}>
							<Outlet />
						</Box>
					</Grid>
				</Grid>
			</Container>
		</Box>
	);
};

export {CabinetPage};
