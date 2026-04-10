import {FC, useEffect, useMemo, useState} from "react";
import {Badge, Box, IconButton, Tooltip} from "@mui/material";
import {Favorite, FavoriteBorder} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {authorActions, likeActions} from "../../redux";

interface IProps {
	_id: string;
}

const LikeToggle: FC<IProps> = ({_id}) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const {loginAuthor} = useAppSelector(state => state.authReducer);
	const {loading} = useAppSelector(state => state.likeReducer);
	const {list: {authors}, author: authorById} = useAppSelector(state => state.authorReducer);

	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [totalLikes, setTotalLikes] = useState<number>(0);

	const author = useMemo(() => {
		if (!!authors.length) {
			const index = authors.findIndex(author => author._id === _id);

			if (index >= 0) return authors[index];
		} else {
			return authorById;
		}
	}, [_id, authorById, authors]);

	useEffect(() => {
		if (author) {
			setIsLiked(!!author.isLiked);
			setTotalLikes(author.totalLikes);
		}
	}, [author]);

	const handleLikeInc = async () => {
		await dispatch(likeActions.likeToggle(_id));
		if (!!authors.length) {
			dispatch(authorActions.likeToggle(_id));
			dispatch(authorActions.incTotalLikes(_id));
		} else {
			dispatch(authorActions.likeToggleId());
			dispatch(authorActions.incTotalLikesId());
		}
	};

	const handleLikeDec = async () => {
		await dispatch(likeActions.likeToggle(_id));
		if (!!authors.length) {
			dispatch(authorActions.likeToggle(_id));
			dispatch(authorActions.decTotalLikes(_id));
		} else {
			dispatch(authorActions.likeToggleId());
			dispatch(authorActions.decTotalLikesId());
		}
	};

	function renderAction() {
		if (!loginAuthor) {
			return (
				<Tooltip title="Login to like">
					<IconButton onClick={() => navigate("/login")} sx={{ transition: "all 0.2s" }}>
						<Badge
							badgeContent={totalLikes}
							color="secondary"
							showZero
							sx={{ "& .MuiBadge-badge": { top: 4, right: 4 } }}
						>
							<FavoriteBorder fontSize="medium" color="primary" />
						</Badge>
					</IconButton>
				</Tooltip>
			);
		} else if (isLiked) {
			return (
				<Tooltip title="Unlike">
					<IconButton
						disabled={loading || loginAuthor._id === _id}
						onClick={handleLikeDec}
						sx={{
							transition: "all 0.2s",
							"&:hover": { transform: "scale(1.1)" },
							"&:active": { transform: "scale(0.95)" }
						}}
					>
						<Badge
							badgeContent={totalLikes}
							color="secondary"
							showZero
							sx={{ "& .MuiBadge-badge": { top: 4, right: 4 } }}
						>
							<Favorite fontSize="medium" color="primary" />
						</Badge>
					</IconButton>
				</Tooltip>
			);
		} else {
			return (
				<Tooltip title="Like">
					<IconButton
						disabled={loading || loginAuthor._id === _id}
						onClick={handleLikeInc}
						sx={{
							transition: "all 0.2s",
							"&:hover": { transform: "scale(1.1)" },
							"&:active": { transform: "scale(0.95)" }
						}}
					>
						<Badge
							badgeContent={totalLikes}
							color="secondary"
							showZero
							sx={{ "& .MuiBadge-badge": { top: 4, right: 4 } }}
						>
							<FavoriteBorder fontSize="medium" color="primary" />
						</Badge>
					</IconButton>
				</Tooltip>
			);
		}
	}

	return (
		renderAction() ?? <Box>Like</Box>
	);
};

export {LikeToggle};
