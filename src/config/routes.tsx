import pMinDelay from 'p-min-delay'
import { Link } from 'react-router-dom'
import { MenuPage } from '../components'
import { lazy, Suspense } from 'react'

const Home = lazy(() => pMinDelay(import('../pages/home'), 200))
const IFRAME = lazy(() => pMinDelay(import('../pages/iframe'), 200))

export const route = [
    {
        path: "/",
        element: <MenuPage />,
        children: [
            {
                index: true, element: <Suspense fallback={<>...</>}>
                    <Home />
                </Suspense>
            },
            {
                path: "con/:key/:value",
                element: <Suspense fallback={<>...</>}>
                    <IFRAME />
                </Suspense>
            },
            { path: "*", element: <NoMatch /> }
        ]
    }
]

function NoMatch() {
    return (
        <div>
            <p>
                <Link to="/">Go to the home page</Link>
            </p>
        </div>
    )
}
