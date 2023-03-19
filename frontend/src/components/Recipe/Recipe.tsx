import {FC, useState} from "react";
import {
	Alert,
	Avatar, Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	CardMedia,
	Grid,
	Link,
	Paper,
	Rating, Snackbar,
	Typography
} from "@mui/material";

import {IRecipe} from "../../interfaces";
import {BookToggle} from "../BookToggle/BookToggle";
import {getPrettyDate} from "../../helpers";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {moderationActions} from "../../redux";

interface IProps {
	recipe: IRecipe;
	showModerateButton: boolean;
}

const Recipe: FC<IProps> = ({recipe, showModerateButton}) => {
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

	const [bookState, setBookState] = useState<boolean | undefined>(inBook);
	const [bookCountState, setBookCountState] = useState<number>(bookCount);

	const dispatch = useAppDispatch();
	const {statusCode, loading, errorMessage} = useAppSelector(state => state.moderationReducer);

	const handleModerate = (): void => {
		dispatch(moderationActions.moderateRecipe(_id));
	};

	return (
		<Grid item xl={3} lg={4} md={5}>
			<Card>
				<CardHeader
					avatar={<Avatar src={avatar ? avatar : "/broken-image.jpg"} />}
					title={
						<Typography variant="subtitle1">
							<Link
								href={`/authors/${creator._id}`}>{userName}
							</Link>
						</Typography>
					}
					subheader={getPrettyDate(createdAt)}
					action={
						<BookToggle
							_id={_id}
							bookCount={bookCountState}
							inBook={bookState}
							setBook={setBookState}
							setBookCount={setBookCountState}
						/>
					}
				/>
				<CardContent>
					<Typography variant="h5">
						{title}
						{gallery.length ?
							<CardMedia
								component="img"
								height="200"
								image={gallery.length ? gallery[0].path : "static/images/cards/paella.jpg"}
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
						({rating}) reviews: {reviewsCount}
					</Typography>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between"
						}}
					>
						<Link href={`/recipes/${_id}`} color="inherit" underline="none">
							<Button variant="contained">
								Details
							</Button>
						</Link>
						{
							showModerateButton &&
							<Button disabled={loading} onClick={handleModerate} variant="contained">Moderate</Button>
						}
					</Box>
					<Snackbar open={statusCode === 200} autoHideDuration={3000}>
						<Alert severity="success" sx={{width: "100%"}}>
							Recipe has been moderated
						</Alert>
					</Snackbar>
					<Snackbar open={!!errorMessage} autoHideDuration={3000}>
						<Alert severity="error" sx={{width: "100%"}}>
							{errorMessage}
						</Alert>
					</Snackbar>
				</CardContent>
			</Card>
		</Grid>
	);
};

export {Recipe};
