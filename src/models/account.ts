import Keycloak from 'keycloak-js'

interface UserProfile extends Keycloak.KeycloakProfile {
    // eslint-disable-next-line @typescript-eslint/ban-types
    attributes?: {}
}

interface UserAuthResponse {
    authenticator: Keycloak.KeycloakInstance,
    isAuthenticated?: boolean,
    token?: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    loadUserInfo: () => {};
    loadUserProfile: () => Promise<UserProfile | undefined>;
}

interface UserInfo {
    email?: string,
    email_verified?: boolean,
    employeeNumber?: number,
    given_name?: string,
    name?: string,
    preferred_username?: string,
    sub?: string
}

export {
    UserProfile,
    UserAuthResponse,
    UserInfo
}
