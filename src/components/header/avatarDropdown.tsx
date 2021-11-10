import { useCallback, useContext, Key, ReactInstance, MouseEvent } from 'react'
import { LogoutOutlined, SettingOutlined, UserOutlined, SmileTwoTone, DownOutlined } from '@ant-design/icons'
import { Avatar, Menu, Spin } from 'antd'
import { Dropdown, ComponentContext } from '..'
import styles from './index.module.scss'

interface IEvent {
    key: Key,
    keyPath: Key[],
    item: ReactInstance,
    domEvent: MouseEvent<HTMLElement>
}

export default function AvatarDropDown(): JSX.Element {

    const context = useContext(ComponentContext)

    const onMenuClick = useCallback(
        (event: IEvent) => {
            console.log(event)
            if (event.key === 'logout' && context.authResponse) {
                context.authResponse.authenticator.logout();
            }
        },
        [context.authResponse],
    );

    const menuHeaderDropdown = (
        <Menu className={styles.menu} onClick={(event: any) => onMenuClick(event)}>
            <Menu.Item key="logout">
                <LogoutOutlined />
                退出登录
            </Menu.Item>
        </Menu>
    )

    return <Dropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
            <Avatar size="default" className={styles.avatar} src={<SmileTwoTone />} alt="avatar" />
            <span className={styles.name}>{context.account?.name}</span>
            <DownOutlined />
        </span>
    </Dropdown>
}
