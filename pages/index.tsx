import { Helmet } from "react-helmet-async";

export default function Index(): JSX.Element {
    return (<>
        <Helmet>
            <title>BXG Admin | Home</title>
        </Helmet>
        <h2 className="title is-2">Hello, World.</h2>
    </>);
}
