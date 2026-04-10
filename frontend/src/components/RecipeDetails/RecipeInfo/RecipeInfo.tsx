import {Avatar, Box, Button, Rating, Typography, Stack} from "@mui/material";
import {FC} from "react";
import {CalendarToday, Person} from "@mui/icons-material";
import {BookToggle} from "../../BookToggle/BookToggle";
import {getPrettyDate} from "../../../helpers";
import {useNavigate} from "react-router-dom";

interface IProps {
	_id: string;
	title: string;
	description: string;
	rating: number;
	reviewsCount: number;
	bookCount: number;
	inBook: boolean | undefined;
	creator: {
		_id: string,
		avatar: string | null,
		userName: string
	};
	createdAt: string;
}

const RecipeInfo: FC<IProps> = (recipe) => {
	const {
		_id,
		title,
		description,
		rating,
		reviewsCount,
		creator,
		createdAt
	} = recipe;

	const navigate = useNavigate();

	return (
		<Box sx={{mb: 3}}>
			<Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
				<Box>
					<Typography variant="h3" component="h1" fontWeight={700} color="text.primary" gutterBottom sx={{textTransform: "capitalize"}}>
						{title}
					</Typography>
					<Stack direction="row" spacing={2} alignItems="center" sx={{mb: 2}}>
						<Rating name="read-only" value={rating} precision={0.1} readOnly size="small" />
						<Typography variant="body2" color="text.secondary" fontWeight={500}>
							{rating.toFixed(1)} ({reviewsCount} reviews)
						</Typography>
					</Stack>
				</Box>
				<BookToggle _id={_id} />
			</Stack>

			<Typography variant="body1" color="text.secondary" sx={{mb: 3, fontStyle: "italic", lineHeight: 1.6}}>
				{description}
			</Typography>

			<Stack
				direction={{xs: "column", sm: "row"}}
				spacing={3}
				alignItems={{xs: "flex-start", sm: "center"}}
				sx={{
					p: 2,
					bgcolor: "background.paper",
					borderRadius: 2,
					boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
				}}
			>
				<Stack direction="row" spacing={1.5} alignItems="center">
					<Avatar
						src={creator.avatar || ""}
						sx={{width: 40, height: 40, bgcolor: "primary.main"}}
					>
						{!creator.avatar && <Person />}
					</Avatar>
					<Box>
						<Typography variant="caption" display="block" color="text.secondary">
							Author
						</Typography>
						<Button
							onClick={() => navigate(`/authors/${creator._id}`)}
							variant="text"
							sx={{
								p: 0,
								minWidth: 0,
								textTransform: "none",
								fontWeight: 600,
								color: "primary.main",
								"&:hover": {backgroundColor: "transparent", color: "primary.dark"}
							}}
						>
							{creator.userName}
						</Button>
					</Box>
				</Stack>

				<Stack direction="row" spacing={1.5} alignItems="center">
					<Avatar sx={{width: 40, height: 40, bgcolor: "action.selected", color: "action.active"}}>
						<CalendarToday fontSize="small" />
					</Avatar>
					<Box>
						<Typography variant="caption" display="block" color="text.secondary">
							Published
						</Typography>
						<Typography variant="body2" fontWeight={600}>
							{getPrettyDate(createdAt)}
						</Typography>
					</Box>
				</Stack>
			</Stack>
		</Box>
	);
};

export {RecipeInfo};
