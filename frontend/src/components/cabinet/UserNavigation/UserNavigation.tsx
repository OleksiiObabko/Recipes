import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import {FC, SyntheticEvent, useEffect, useMemo, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {
	Person as PersonIcon,
	RestaurantMenu as RestaurantMenuIcon,
	Bookmark as BookmarkIcon,
	AddCircle as AddCircleIcon,
	LibraryAdd as LibraryAddIcon,
	Public as PublicIcon,
	Gavel as GavelIcon
} from "@mui/icons-material";

interface ITab {
	link: string,
	label: string,
	icon: JSX.Element
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
			link: "my-recipes",
			label: "My recipes",
			icon: <RestaurantMenuIcon />
		},
		{
			link: "my-book",
			label: "My book",
			icon: <BookmarkIcon />
		},
		{
			link: "create-recipe",
			label: "Create recipe",
			icon: <AddCircleIcon />
		},
		{
			link: "profile",
			label: "Profile",
			icon: <PersonIcon />
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
			sx={{
				bgcolor: "background.paper",
				borderRadius: 4,
				overflow: "hidden",
				boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
				border: "1px solid rgba(0,0,0,0.05)"
			}}
		>
			<Tabs
				orientation="vertical"
				variant="scrollable"
				value={value}
				onChange={handleChange}
				aria-label="User navigation"
				sx={{
					'& .MuiTab-root': {
						alignItems: 'flex-start',
						textAlign: 'left',
						textTransform: 'none',
						fontWeight: 600,
						py: 2,
						px: 3,
						minHeight: 56,
						transition: '0.2s',
						'&:hover': {
							bgcolor: 'rgba(25, 118, 210, 0.04)',
						},
						'&.Mui-selected': {
							bgcolor: 'rgba(25, 118, 210, 0.08)',
						}
					},
					'& .MuiTabs-indicator': {
						left: 0,
						width: 4,
						borderRadius: '0 4px 4px 0'
					}
				}}
			>
				{
					tabs.map((tab, index) => (
						<Tab
							key={index}
							onClick={() => navigate(tab.link)}
							label={tab.label}
							icon={tab.icon}
							iconPosition="start"
							sx={{gap: 2}}
						/>
					))
				}
			</Tabs>
		</Box>
	);
};

export {UserNavigation};
