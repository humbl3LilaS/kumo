import { useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const AuthLayout = () => {
	const [isAuthenticated] = useState(false);

	return (
		<>
			{isAuthenticated ? (
				<Navigate to={"/"} />
			) : (
				<>
					<section className="py-10 flex-1 flex justify-center items-center flex-col">
						<Outlet />
					</section>
					<img
						src="/assets/images/side-img.svg"
						alt="login banner"
						className="hidden h-screen w-1/2 object-cover bg-no-repeat lg:block"
					/>
				</>
			)}
		</>
	);
};

export default AuthLayout;
