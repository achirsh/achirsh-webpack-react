import { menu } from './menu'
import { route } from './routes'
import { authInit, retriveAccessToken } from './userAuth'

// 应用名称
export const APP_NAME = 'React Admin';
// 页面理由前缀
export const BASE_NAME = ''

// 页面可视高度
export function clientHeight() {
    return (document.documentElement && document.documentElement.clientHeight) ? document.documentElement.clientHeight : document.body.clientHeight
}

export {
    menu,
    route,
    authInit,
    retriveAccessToken
}
