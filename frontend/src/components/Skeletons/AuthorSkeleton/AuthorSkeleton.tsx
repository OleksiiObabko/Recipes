import {FC} from "react";
import {Box, Card, CardContent, Grid, Skeleton, Stack, Divider} from "@mui/material";

const AuthorSkeleton: FC = () => {
	return (
		<Grid item xs={12} sm={6} md={6} lg={4} xl={3} sx={{display: "flex"}}>
			<Card sx={{display: "flex", flexDirection: "column", width: "100%", borderRadius: 4, boxShadow: "0 4px 20px rgba(0,0,0,0.05)", border: "1px solid rgba(0,0,0,0.05)"}}>
				<CardContent sx={{p: 3, flexGrow: 1}}>
					<Box sx={{display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2}}>
						<Skeleton variant="circular" width={64} height={64} />
						<Skeleton variant="circular" width={40} height={40} />
					</Box>

					<Skeleton variant="text" sx={{fontSize: "1.5rem", mb: 0.5}} width="70%" />
					<Skeleton variant="text" width="40%" sx={{mb: 2}} />

					<Divider sx={{mb: 2, opacity: 0.6}} />

					<Grid container spacing={2} sx={{mb: 3}}>
						{[...Array(4)].map((_, index) => (
							<Grid item xs={6} key={index}>
								<Stack direction="row" spacing={1} alignItems="center">
									<Skeleton variant="circular" width={20} height={20} />
									<Box sx={{width: '100%'}}>
										<Skeleton variant="text" width="60%" />
										<Skeleton variant="text" width="40%" />
									</Box>
								</Stack>
							</Grid>
						))}
					</Grid>

					<Skeleton variant="rectangular" height={36} sx={{borderRadius: 2}} />
				</CardContent>
			</Card>
		</Grid>
	);
};

export {AuthorSkeleton};
