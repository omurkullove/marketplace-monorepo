import AppHeader from "./app-header";

type Props = {
	children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
	return (
		<div className="min-h-screen flex flex-col">
			<AppHeader />
			<main className="flex-1 mt-[105px] sm:mt-[84px] w-full bg-background-primary min-h-screen">
				<div className="max-w-[1200px] mx-auto px-2 lg:px-4">{children}</div>
			</main>

			<footer className="bg-background-primary text-text-primary  border-t border-t-border">
				<div className="max-w-[1200px] mx-auto px-4 py-7">
					<p className="text-center">© 2025 Marketplace Mockup</p>
				</div>
			</footer>
		</div>
	);
};

export default AppLayout;
