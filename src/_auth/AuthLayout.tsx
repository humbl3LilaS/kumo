import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	return (
		<>
			{isAuthenticated ? (
				<Navigate to={"/"} />
			) : (
				<section>
					<h1>Auth layout</h1>
					<Outlet />
				</section>
			)}
		</>
	);
};

export default AuthLayout;
