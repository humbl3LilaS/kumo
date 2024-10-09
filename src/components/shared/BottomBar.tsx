import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";

const BottomBar = () => {
	return (
		<section className="bottom-bar">
			<nav className="w-full">
				<ul className="flex items-center justify-between">
					{sidebarLinks.map((item) => (
						<li key={item.label}>
							<NavLink
								to={item.route}
								className={({ isActive }) =>
									cn(
										"p-4 flex-center flex-col gap-y-1 rounded-[10px] transition ",
										isActive && "bg-primary-500  [&>img]:invert-white",
									)
								}>
								<img
									src={item.imgURL}
									alt={item.route}
									className="aspect-square w-4 group-hover:invert-white"
								/>
								<span className="tiny-medium text-light-2">{item.label}</span>
							</NavLink>
						</li>
					))}
				</ul>
			</nav>
		</section>
	);
};

export default BottomBar;
