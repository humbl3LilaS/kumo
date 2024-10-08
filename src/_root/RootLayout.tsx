import { Outlet } from "react-router-dom";

const RootLayout = () => {
	return (
		<div>
			<span>root layouut</span>
			<Outlet />
		</div>
	);
};

export default RootLayout;
