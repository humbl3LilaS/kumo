import { sidebarLinks } from "@/constants";
import { useUserQuery } from "@/lib/query/query";
import { cn } from "@/lib/utils";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccountMutation } from "@/lib/query/mutation";
import ProfileSkeleton from "../skeleton/ProfileSkeleton";

const LeftSideBar = () => {
	const { data: user } = useUserQuery();
	const navigate = useNavigate();

	const { mutateAsync: signOut } = useSignOutAccountMutation();

	const logOutController = async () => {
		await signOut();

		localStorage.setItem("cookieFallback", "[]");
		navigate("/auth/sign-in");
	};

	return (
		<nav className="leftsidebar">
			<div className="flex flex-col gap-11">
				<Link
					to={"/"}
					className="px-4 flex justify-start items-center gap-x-2">
					<img
						className="aspect-square w-10"
						src="/assets/icons/kumo.svg"
						alt="kumo"
					/>
					<span className="text-3xl font-extrabold tracking-wider">Kumo</span>
				</Link>
				{user ? (
					<Link
						to={`profile/${user?.$id}`}
						className="flex items-center justify-start gap-x-4">
						<img
							src={user?.imageUrl}
							alt="profile"
							className="aspect-square w-10 rounded-full xl:w-14"
						/>
						<div className="flex flex-col">
							<p className="body-bold">{user?.name}</p>
							<p className="small-regular text-light-3">{`@${user?.username}`}</p>
						</div>
					</Link>
				) : (
					<ProfileSkeleton />
				)}
				<ul className="flex flex-col gap-y-4">
					{sidebarLinks.map((item) => (
						<li
							key={item.label}
							className={"leftsidebar-link group"}>
							<NavLink
								to={item.route}
								className={({ isActive }) =>
									cn(
										"p-4 flex gap-x-6 items-center rounded-lg",
										isActive && "bg-primary-500 [&>img]:invert-white",
									)
								}>
								<img
									src={item.imgURL}
									alt={item.route}
									className="group-hover:invert-white"
								/>
								<span>{item.label}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</div>
			<Button
				variant={"ghost"}
				className="shad-button_ghost"
				onClick={logOutController}>
				<img
					src="/assets/icons/logout.svg"
					alt="logout"
				/>
				<span className="small-medium lg:base-medium ! font-bold">Log out</span>
			</Button>
		</nav>
	);
};

export default LeftSideBar;
