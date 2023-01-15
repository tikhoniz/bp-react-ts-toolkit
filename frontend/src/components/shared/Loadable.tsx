import { Suspense } from "react";
import LoadingScreen from "./loaders/LoadingScreen";

const Loadable = (Component: any) => (props: any) => {
	return (
		<Suspense fallback={<LoadingScreen />}>
			<Component {...props} />
		</Suspense>
	);
};

export default Loadable;
