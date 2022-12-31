import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { CookiesProvider } from "react-cookie";

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { setupStore } from "./store";
import "./index.css";

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);

const store = setupStore();

root.render(
	<Provider store={store}>
		<CookiesProvider>
			<HelmetProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</HelmetProvider>
		</CookiesProvider>
	</Provider>
);
