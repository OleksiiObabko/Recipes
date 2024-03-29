import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {FC, SyntheticEvent, useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

interface ITab {
	link: string,
	label: string
}

const UserNavigation: FC = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const [value, setValue] = useState<number | boolean>(false);

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const tabs: ITab[] = useMemo(() => [
		{
			link: "profile",
			label: "Profile"
		},
		{
			link: "my-recipes",
			label: "My recipes"
		},
		{
			link: "my-book",
			label: "My book"
		},
		{
			link: "create-recipe",
			label: "Create recipe"
		}
	], []);

	useEffect(() => {
		const pathName: string[] = location.pathname.split("/");
		for (let i = 0; i < tabs.length; i++) {
			if (tabs[i].link === pathName[pathName.length - 1]) {
				setValue(i);
			}
		}
	}, [location.pathname, tabs]);

	return (
		<Box
			sx={{bgcolor: "background.paper"}}
		>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="Vertical tabs example"
				sx={{borderRight: 1, borderColor: "divider"}}
			>
				{
					tabs.map((tab, index) => <Tab key={index} onClick={() => navigate(tab.link)} label={tab.label} />)
				}
			</Tabs>
		</Box>
	);
};

export {UserNavigation};
