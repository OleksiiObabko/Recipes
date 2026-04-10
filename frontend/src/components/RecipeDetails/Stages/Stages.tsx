import {FC} from "react";
import {Box, Typography} from "@mui/material";

import {Stage} from "../Stage/Stage";

interface IStage {
	_id: string;
	number: number;
	photo: string | null;
	description: string;
}

interface IStages {
	stages: IStage[],
}

const Stages: FC<IStages> = ({stages}) => {
	return (
		<Box sx={{mt: 4, mb: 4}}>
			<Typography variant="h5" fontWeight={700} gutterBottom sx={{mb: 3, color: "primary.main"}}>
				Cooking Stages
			</Typography>
			<Box sx={{display: "flex", flexDirection: "column", rowGap: 4}}>
				{stages.map(stage =>
					<Stage key={stage._id} stage={stage} />
				)}
			</Box>
		</Box>
	);
};

export {Stages};
