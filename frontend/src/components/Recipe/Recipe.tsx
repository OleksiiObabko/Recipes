import {FC} from "react";
import {
	Avatar,
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

import {IRecipe} from "../../interfaces";
import {baseURL} from "../../configs";
import {BookToggle} from "../BookToggle/BookToggle";

interface IProps {
	recipe: IRecipe;
}

const Recipe: FC<IProps> = ({recipe}) => {
	const {
		_id,
		category,
		kitchen,
		creator,
		createdAt,
		gallery,
		rating,
		reviewsCount,
		time,
		title,
		bookCount,
		inBook,
		servings
	} = recipe;
	const {avatar, userName} = creator;

	return (
		<Grid item xl={3} lg={4} md={5}>
			<Card>
				<CardHeader
					avatar={<Avatar src={avatar ? baseURL + avatar : "/broken-image.jpg"} />}
					title={
						<Typography variant="subtitle1">
							<Link
								href={`/authors/${creator._id}`}>{userName}
							</Link>
						</Typography>
					}
					subheader={createdAt}
					action={<BookToggle _id={_id} bookCount={bookCount} inBook={inBook} />}
				/>
				<CardContent>
					<Typography variant="h5">
						{title}
						{gallery.length ?
							<CardMedia
								component="img"
								height="200"
								image={gallery.length ? baseURL + gallery[0].path : "static/images/cards/paella.jpg"}
								alt="preview"
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
					<Link href={`/recipes/${_id}`} color="inherit" underline="none">
						<Button variant="contained">
							Details
						</Button>
					</Link>
				</CardContent>
			</Card>
		</Grid>
	);
};

export {Recipe};
