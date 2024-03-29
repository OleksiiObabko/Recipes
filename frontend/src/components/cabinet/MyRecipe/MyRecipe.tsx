import {FC} from "react";
import {
	Alert,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	Link,
	Paper,
	Rating,
	Typography
} from "@mui/material";

import {IMyRecipe} from "../../../interfaces";
import {getPrettyDate} from "../../../helpers";
import {BookToggle} from "../../BookToggle/BookToggle";
import {DeleteButton} from "../DeleteButton/DeleteButton";
import {useNavigate} from "react-router-dom";

interface IProps {
	recipe: IMyRecipe;
	showBook?: boolean;
}

const MyRecipe: FC<IProps> = ({recipe, showBook = false}) => {
	const {
		_id,
		category,
		kitchen,
		createdAt,
		gallery,
		rating,
		reviewsCount,
		time,
		title,
		isModerated,
		servings
	} = recipe;

	const navigate = useNavigate();

	return (
		<Grid item xl={3} lg={4} md={5}>
			<Card>
				<CardHeader
					subheader={getPrettyDate(createdAt)}
					action={
						showBook ? <BookToggle _id={_id} /> :
							<DeleteButton recipeId={_id} />
					}
				/>
				<CardContent>
					{
						!isModerated && <Alert severity="warning">Wait for moderation</Alert>
					}
					<Typography variant="h5">
						{title}
						{gallery.length ?
							<CardMedia
								component="img"
								height="200"
								image={gallery.length ? gallery[0].path : "static/images/cards/paella.jpg"}
								alt={`${title} preview`}
								sx={{borderRadius: 5}}
							/> :
							<Paper sx={{height: 200, borderRadius: 5, bgcolor: "grey"}}
							/>
						}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Time: {time}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Category: {category}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Kitchen: {kitchen}
					</Typography>
					<Typography variant="body2" color="text.secondary">
						Servings: {servings}
					</Typography>
					<Typography variant="body2" color="text.secondary" sx={{display: "flex", alignItems: "center"}}>
						<Rating name="read-only" value={rating} precision={0.1} readOnly />
						{reviewsCount}
					</Typography>
					<Link sx={{cursor: "pointer"}} onClick={() => navigate(`/recipes/${_id}`)} color="inherit"
							underline="none">
						<Button variant="contained">
							Details
						</Button>
					</Link>
				</CardContent>
			</Card>
		</Grid>
	);
};

export {MyRecipe};
