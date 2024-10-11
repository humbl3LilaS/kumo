import GridPostList from "@/components/shared/GridPostList";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useGetPosts, useSearchPost } from "@/lib/query/query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Explore = () => {
	const { ref, inView } = useInView();

	const [searchValue, setSearchValue] = useState("");

	const debouncedValue = useDebounce(searchValue, 250);

	const { data: searchedPosts } = useSearchPost(debouncedValue);

	const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

	useEffect(() => {
		if (inView && !searchValue) fetchNextPage();
	}, [inView, searchValue, fetchNextPage]);

	return (
		<div className="explore-container">
			<div className="explore-inner_container">
				<h2 className="w-full h3-bold md:h2-bold ">Search Post</h2>
				<div className="w-full px-4 flex gap-1 rounded-lg bg-dark-4">
					<img
						src="/assets/icons/search.svg"
						className="aspect-square w-8"
						alt="search"
					/>
					<Input
						type="text"
						className="explore-search"
						value={searchValue}
						onChange={(evt) => setSearchValue(evt.target.value)}
					/>
				</div>
			</div>
			<div className="w-full max-w-5xl mt-16 mb-7 flex-between">
				<h3 className="body-bold md:h3-bold ">Popular Today</h3>
				<div className="px-4 py-2 flex-center gap-3 bg-dark-3 rounded-xl cursor-pointer">
					<p className="small-meidum md:base-medium text-light-2">All</p>
					<img
						src="/assets/icons/filter.svg"
						alt="filter"
						className="aspect-square w-5"
					/>
				</div>
			</div>

			{!searchValue && (
				<div className="w-full max-w-5xl flex flex-wrap gap-9">
					{posts &&
						posts.pages.map((item, index) => (
							<GridPostList
								key={`page-${index}`}
								posts={item.documents}
								showStatus={true}
							/>
						))}
				</div>
			)}

			{searchValue && (
				<div className="w-full max-w-5xl flex flex-wrap gap-9">
					{searchedPosts && (
						<GridPostList
							posts={searchedPosts.documents}
							showStatus={true}
						/>
					)}
				</div>
			)}

			{hasNextPage && !searchValue && (
				<div
					ref={ref}
					className="mt-10">
					<div className="w-full flex justify-center gap-x-3 items-center font-boldrounded-xl">
						<img
							src="/assets/icons/loader.svg"
							alt="loading"
							className="aspect-square w-5"
						/>
						<span className="tracking-wider">loading</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Explore;
