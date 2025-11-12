import { PAGE } from "@/lib/infrastructure/pages";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<main className="w-full h-screen flex items-center justify-center">
			<div className="flex flex-col items-center text-center space-y-6 p-8 bg-background-secondary rounded-2xl shadow-lg">
				<div>
					<h1 className="text-7xl font-bold text-text-primary mb-2">404</h1>
					<p className="text-xl font-medium text-text-secondary">
						Page not found
					</p>
				</div>

				<Link
					to={PAGE.HOME}
					className="flex items-center gap-2 px-4 py-2 bg-button-primary text-white rounded-xl transition-colors hover:bg-button-primary/90"
				>
					<ArrowLeft className="size-5" />
					<span>Go Home</span>
				</Link>
			</div>
		</main>
	);
};

export default NotFoundPage;
