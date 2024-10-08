import { Outlet } from "react-router-dom";

const AuthLayout = () => {
	return (
		<div>
			<span>auth layout</span>
			<Outlet />
		</div>
	);
};

export default AuthLayout;
