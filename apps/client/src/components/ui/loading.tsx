import { Loader2 } from "lucide-react";

const Loading = () => {
	return (
		<div className="flex justify-center items-center h-full py-10">
			<Loader2 className="w-8 h-8 text-button-primary animate-spin" />
		</div>
	);
};

export default Loading;
