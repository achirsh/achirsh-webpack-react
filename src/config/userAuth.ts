import Keycloak from 'keycloak-js'
import { UserProfile, UserAuthResponse } from '../models'

const AUTH_SETTING = {
    url: 'http://auth-dev.boxuegu.com/auth',
    realm: 'employee',
    // clientId: 'bxg-teaching-workbench'
    clientId: 'bxg-manage-static'
}

const keycloak = Keycloak(AUTH_SETTING)

/**
 * 初始化Keycloak对象；判断是否已认证，如未认证则直接跳转到登录页面
 */
const keycloakInit = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        // 认证初始化，如果未登录则跳转到登录页面
        // checkLoginIframe: false，关闭注销检查。因为adpter11.0.0以下版本打开后会不断的刷新页面
        keycloak.init({ onLoad: 'login-required', checkLoginIframe: false }).then(authenticated => {
            if (!authenticated) {
                window.location.reload()
            }

            return resolve()
        }).catch(error => {
            return reject(error)
        })
    })
}

/**
 * 定时刷新访问令牌
 */
const refreshAccessToken = () => {
    setInterval(() => {
        if (keycloak.authenticated) {
            keycloak.updateToken(30).then(refreshed => {
                if (refreshed) {
                    console.log('访问令牌已更新！');
                }
            }).catch(error => {
                console.log('访问令牌更新失败！', error);
            })
        }
    }, 290000);
}


/**
 * 加载用户信息，含所有用户的自定义属性
 */
// eslint-disable-next-line @typescript-eslint/ban-types
const loadCurrentUserInfo = (): Promise<any> => {
    return new Promise((resolve, reject) => {
        if (!keycloak.authenticated) {
            return reject('尚未登录！无法获取用户信息!')
        }

        keycloak.loadUserInfo().then(() => {
            return resolve(keycloak.userInfo)
        }).catch(error => {
            console.log('获取用户信息失败!', error)
            return reject(error)
        })
    })
}

/**
 * 加载用户Profile，只包含固定的几个字段
 */
const loadCurrentUserProfile = (): Promise<UserProfile | undefined> => {
    return new Promise((resolve, reject) => {
        if (!keycloak.authenticated) {
            return reject('尚未登录！无法获取用户Profile信息！');
        }

        keycloak.loadUserProfile().then(() => {
            return resolve(keycloak.profile)
        }).catch(error => {
            console.log('获取用户Profile失败！', error);
            return reject(error);
        })
    });
}

/**
 * 获取当前登录用户的AccessToken
 */
const retriveAccessToken = (): string | undefined => {
    return keycloak.token;
}

/**
 *  开始用户认证，未登录则跳转登录页。
 *  1、是否已认证判断
 *  2、开启定时刷新访问令牌
 *  3、预加载当前登录用户信息
 */
const authInit = async (): Promise<UserAuthResponse> => {
    // 初始化认证，未登录则跳转到登陆页
    await keycloakInit()

    // 刷新令牌
    refreshAccessToken()

    // 提前异步缓存用户信息，避免通过Keycloak.KeycloakInstance获取userinfo、profile为空
    loadCurrentUserInfo()

    return {
        authenticator: keycloak,
        isAuthenticated: keycloak.authenticated,
        token: keycloak.token,
        loadUserInfo: loadCurrentUserInfo,
        loadUserProfile: loadCurrentUserProfile
    }
}

export { authInit, loadCurrentUserInfo, loadCurrentUserProfile, retriveAccessToken }
