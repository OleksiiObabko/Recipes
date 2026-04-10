import {FC} from "react";
import {Box, Card, CardContent, Grid, Skeleton, Stack, Divider} from "@mui/material";

const RecipeSkeleton: FC = () => {
	return (
		<Grid item xs={12} sm={6} md={6} lg={4} xl={3} sx={{display: "flex"}}>
			<Card sx={{display: "flex", flexDirection: "column", width: "100%", borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.05)"}}>
				<Skeleton variant="rectangular" height={220} />
				<CardContent sx={{flexGrow: 1, p: 3}}>
					<Skeleton variant="text" sx={{fontSize: "1.5rem", mb: 1}} width="80%" />
					
					<Stack direction="row" spacing={1} alignItems="center" sx={{mb: 2}}>
						<Skeleton variant="rectangular" width={80} height={16} />
						<Skeleton variant="text" width={40} />
					</Stack>

					<Grid container spacing={1.5} sx={{mb: 2.5}}>
						<Grid item xs={6}>
							<Skeleton variant="text" width="60%" />
						</Grid>
						<Grid item xs={6}>
							<Skeleton variant="text" width="60%" />
						</Grid>
						<Grid item xs={12}>
							<Skeleton variant="text" width="40%" />
						</Grid>
					</Grid>

					<Divider sx={{mb: 2, opacity: 0.6}} />
					
					<Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
						<Box sx={{display: "flex", alignItems: "center", gap: 1}}>
							<Skeleton variant="circular" width={28} height={28} />
							<Box>
								<Skeleton variant="text" width={60} />
								<Skeleton variant="text" width={40} />
							</Box>
						</Box>
						<Skeleton variant="rectangular" width={80} height={30} sx={{borderRadius: 2}} />
					</Box>
				</CardContent>
			</Card>
		</Grid>
	);
};

export {RecipeSkeleton};
