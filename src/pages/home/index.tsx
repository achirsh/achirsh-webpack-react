import { useEffect, useContext } from 'react'
import { ComponentContext, Layout } from '../../components'
import { useSearchParams } from 'react-router-dom'

export default function Home(): JSX.Element {
    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        // console.log('searchParams', searchParams.get('a'))
    }, [])

    return <Layout>
        <div>home</div>
    </Layout>
}
