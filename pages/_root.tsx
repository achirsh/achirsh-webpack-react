import "./_root.scss";
import { StrictMode, Suspense, lazy } from "react";
import { render } from "react-dom";
import { HelmetProvider } from "react-helmet-async";

const Index = lazy(() => import("./index"));

render(<StrictMode><HelmetProvider><Suspense fallback={null}><Index /></Suspense></HelmetProvider></StrictMode>, document.getElementById("root"));

module.hot?.accept();
