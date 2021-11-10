import { useContext, createContext } from 'react'
import { IComponentContextValue } from '../../models'

// 配置参数默认值
const initialValue = {
    loadingTip: '加载中......',
    isMobile: false,
    mobileColumnDefaultWidth: 200,
    account: null,
    setAccount: () => undefined,
    authResponse: null,
    menu: [],
    clientHeight: undefined,
    setClientHeight: () => undefined,
    rAToken: null,
    collapsed: false,
    setCollapsed: () => undefined
}

export const ComponentContext = createContext<IComponentContextValue>(initialValue);
export default ComponentContext

// 以props形式，接受各个配置
export function ComponentProvider(props: IComponentContextValue) {
    const { children, ...others } = props
    // ComponentProvider嵌套使用时，获取父级的数据
    const parentContext = useContext(ComponentContext);

    return (
        <ComponentContext.Provider value={{ ...initialValue, ...parentContext, ...others }}>
            {children}
        </ComponentContext.Provider>
    )
}

export const ComponentConsumer = ComponentContext.Consumer
