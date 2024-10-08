const Logo = () => {
	return (
		<div className="flex justify-center items-center gap-x-2">
			<img
				src="/assets/icons/kumo.svg"
				alt="Kumo Logo"
				className="aspect-square w-10"
			/>
			<span className="text-3xl font-extrabold tracking-wider">Kumo</span>
		</div>
	);
};

export default Logo;
