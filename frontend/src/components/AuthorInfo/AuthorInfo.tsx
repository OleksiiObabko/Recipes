import {FC} from "react";
import {Alert, Avatar, Badge, Box, Button, Typography} from "@mui/material";

import {IAuthor} from "../../interfaces";
import {baseURL} from "../../configs";
import {LikeToggle} from "../LikeToggle";

interface IProps {
	author: IAuthor;
}

const AuthorInfo: FC<IProps> = ({author}) => {
	const {
		_id,
		userName,
		avatar,
		recipes,
		block,
		totalSubscriptions,
		totalLikes,
		createdAt,
		totalSubscribers,
		role
	} = author;

	return (
		<Box sx={{width: "fit-content", margin: "0 auto", padding: 2}}>
			<Box sx={{display: "flex", columnGap: 2, alignItems: "center", padding: 1}}>
				<Badge badgeContent={role} invisible={role === "user"} color="primary" showZero>
					<Avatar sx={{width: 112, height: 112}} srcSet={avatar ? baseURL + avatar : "/broken-image.jpg"} />
				</Badge>
				<Box>
					<Typography variant="h4">{userName}</Typography>
					<Typography variant="subtitle1">{createdAt}</Typography>
				</Box>
				<Box sx={{display: "flex", alignItems: "center", flexDirection: "column", rowGap: 1}}>
					<LikeToggle totalLikes={totalLikes} _id={_id} />
					<Button variant="contained">Subscribe</Button>
				</Box>
			</Box>
			{
				block &&
				<Box>
					<Alert severity="warning">This author blocked until {block}</Alert>
				</Box>
			}
			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: 1,
				borderBottom: "1px solid black"
			}}>
				<Typography variant="body1">
					Total subscribers
				</Typography>
				<Typography variant="body1">
					{totalSubscribers}
				</Typography>
			</Box>
			<Box sx={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: 1,
				borderBottom: "1px solid black"
			}}>
				<Typography variant="body1">
					Total subscriptions
				</Typography>
				<Typography variant="body1">
					{totalSubscriptions}
				</Typography>
			</Box>
			<Box sx={{display: "flex", justifyContent: "center", alignItems: "center", margin: 3}}>
				<Typography variant="h3">Recipes</Typography>
				<Typography variant="subtitle1">({recipes})</Typography>
			</Box>
		</Box>
	);
};

export {AuthorInfo};
