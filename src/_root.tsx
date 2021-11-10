import "./_root.scss";
import "antd/dist/antd.css";
import { render } from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from 'react-router-dom';

import Index from './pages/index'

render(
    <HelmetProvider>
        <BrowserRouter>
            <Index />
        </BrowserRouter>
    </HelmetProvider>,
    document.getElementById("root"));

module.hot?.accept();
