/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react'
import { UserInfo } from './account'
import { IMenu } from './menu'

interface IComponentContextValue {
    children?: ReactNode,
    // 加载中提示
    loadingTip?: string,
    // 是否是手机布局
    isMobile?: boolean,
    // 手机布局下，缺省column宽度默认值
    mobileColumnDefaultWidth?: number,

    // 账号
    account?: UserInfo | null,
    // 设置账号
    setAccount?: (account: UserInfo | null) => void,
    authResponse?: any,
    // 菜单
    menu: IMenu[],
    // 页面可视高度
    clientHeight?: number | undefined,
    // 设置页面可视高度
    setClientHeight?: (clientHeight: number | undefined) => void,
    rAToken?: any,

    // 左侧菜单收缩
    collapsed: boolean,
    setCollapsed: (collapsed: boolean) => void
}

export {
    IComponentContextValue
}
