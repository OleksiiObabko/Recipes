import {FC} from "react";
import {Container, Box} from "@mui/material";

import {Authors, AuthorsFilters} from "../components";

const AuthorsPage: FC = () => {
	return (
		<Box sx={{backgroundColor: "#fcfcfc", minHeight: "100vh", pt: 4, pb: 8}}>
			<Container sx={{position: "relative", columnGap: 5, display: "flex", alignItems: "flex-start"}} maxWidth={"xl"}>
				<AuthorsFilters />
				<Box sx={{flexGrow: 1, pl: 3, pt: 1}}>
					<Authors />
				</Box>
			</Container>
		</Box>
	);
};

export {AuthorsPage};
