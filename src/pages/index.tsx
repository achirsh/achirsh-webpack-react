import { Helmet } from "react-helmet-async";
import { useEffect, useState } from 'react'
import { authInit, retriveAccessToken, menu, clientHeight, route } from '../config'
import { ConfigProvider, Layout } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import 'moment/locale/zh-cn'   // 解决antd日期相关组件国际化问题
import { Loading, ComponentProvider } from '../components'
import type { UserInfo, UserAuthResponse } from '../models'
import { useRoutes } from 'react-router-dom'

export default function Index(): JSX.Element {
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState<UserInfo | null>(null)
    const [clientH, setClientH] = useState<number | undefined>(clientHeight())
    const [authResponse, setAuthResponse] = useState<any>(null)
    const [rAToken, setRAToken] = useState<any>(null)
    const [collapsed, setCollapsed] = useState(false)

    const element = useRoutes(route)

    useEffect(() => {
        // 获取用户菜单，权限等
        (async () => {
            try {
                // const authResponse: UserAuthResponse = await authInit()
                // const userInfo: UserInfo = await authResponse.loadUserInfo();
                const authResponse = 1
                const userInfo = null
                setAccount(userInfo)
                setAuthResponse(authResponse)
                setRAToken(retriveAccessToken)
            } finally {
                setLoading(false);
            }
        })();
    }, [])

    if (loading) return <Loading progress={false} spin />

    return (
        <ConfigProvider locale={zhCN}>
            <Helmet title="BXG Admin | Home" />
            <ComponentProvider
                account={account}
                setAccount={setAccount}
                menu={menu}
                clientHeight={clientH}
                setClientHeight={setClientH}
                authResponse={authResponse}
                rAToken={rAToken}
                collapsed={collapsed}
                setCollapsed={setCollapsed}
            >
                <Layout>
                    {element}
                </Layout>
            </ComponentProvider>
        </ConfigProvider >
    );
}
