import {ChangeEvent, FC, useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import {useNavigate, useSearchParams} from "react-router-dom";

interface IProps {
	count: number;
}

const MyPagination: FC<IProps> = ({count}) => {
	const navigate = useNavigate();
	const [query] = useSearchParams();
	const [page, setPage] = useState<number>(1);

	useEffect(() => {
		setPage(Number(query.get("page")) || 1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleChange = (event: ChangeEvent<unknown>, value: number) => {
		query.set("page", value.toString());
		navigate({search: query.toString()});
		setPage(value);
	};

	return (
		<Pagination
			sx={{display: "flex", p: "20px 0px", justifyContent: "center"}}
			size="large"
			page={page}
			onChange={handleChange}
			count={Math.ceil(count / 8)}
			variant="outlined"
			shape="rounded"
		/>
	);
};

export {MyPagination};
