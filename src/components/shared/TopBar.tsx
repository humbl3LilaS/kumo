import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccountMutation } from "../../lib/query/mutation";
import { useUserQuery } from "@/lib/query/query";

const TopBar = () => {
	const { mutateAsync: signOut } = useSignOutAccountMutation();
	const navigate = useNavigate();
	const { data: user, isFetching } = useUserQuery();

	const logOutController = async () => {
		await signOut;
		console.log("sign out complete");
		localStorage.setItem("cookieFallback", "[]");
		navigate("/auth/sign-in");
	};

	return (
		<section className="topbar">
			<div className="py-4 px-5 flex-between">
				<Link
					to={"/"}
					className="flex justify-center items-center gap-x-2">
					<img
						className="aspect-square w-10"
						src="/assets/icons/kumo.svg"
						alt="kumo"
					/>
					<span className="text-2xl font-extrabold tracking-wider">Kumo</span>
				</Link>

				<div className="flex gap-4">
					<Button
						variant={"ghost"}
						className="shad-button_ghost"
						onClick={logOutController}>
						<img
							src="/assets/icons/logout.svg"
							alt="logout"
						/>
					</Button>
					<Link
						to={`/profile/${user?.accountId}`}
						className="flex-center gap-3">
						{!isFetching && (
							<img
								src={user?.imageUrl ?? "/assets/images/profile-placeholder.svg"}
								alt="profile"
								className="aspect-square w-8 rounded-full"
							/>
						)}
					</Link>
				</div>
			</div>
		</section>
	);
};

export default TopBar;
