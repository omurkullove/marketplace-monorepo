import Loading from "@/components/ui/loading";
import { useFetch } from "@/lib/hooks/useFetch";
import { PAGE, type PageParams } from "@/lib/infrastructure/pages";
import {
	ROUTE,
	ProductErrorCode,
	type AppErrorJSON,
	type ProductDocument,
} from "@marketplace/shared-packages";
import { Link, useNavigate, useParams } from "react-router-dom";
import MainBlock from "./_components/block/main-block";
import { ArrowLeft } from "lucide-react";
import OffersBlock from "./_components/block/offers-block";
import { useGlobalStore } from "@/core/state/stores/global-store";

const ProductDetailsPage = () => {
	const globalStore = useGlobalStore();
	const currency = globalStore.use("activeCurrency");

	const { id } = useParams<PageParams["PRODUCT_DETAILS"]>();

	console.log(globalStore.getState());

	const navigate = useNavigate();

	const onError = (err: AppErrorJSON) => {
		if (err.code === ProductErrorCode.NOT_FOUND) {
			navigate(PAGE.HOME);
		}
	};

	const { data, loading } = useFetch<ProductDocument>({
		path: ROUTE.PRODUCT_DETAILS,
		dependencies: [currency],
		onError,
		options: { queryParams: { currency }, pathParams: { id } },
	});

	if (loading || !data) {
		return (
			<div className="flex justify-center items-center h-[60vh]">
				<Loading />
			</div>
		);
	}

	return (
		<div className="max-w-[1200px] mx-auto p-4 lg:p-8 space-y-6">
			<Link to={PAGE.HOME}>
				<ArrowLeft className="bg-button-primary hover:bg-button-hover duration-300 text-white p-2 rounded-full size-10" />
			</Link>

			<MainBlock data={data} />
			<OffersBlock offers={data.offers} />
		</div>
	);
};

export default ProductDetailsPage;
