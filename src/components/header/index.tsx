/* eslint-disable @typescript-eslint/no-explicit-any */
import { createElement, useState, useContext, useEffect } from 'react'
import { Layout } from 'antd'
import styles from './index.module.scss'
import { MenuUnfoldOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons'
import AvatarDropdown from './avatarDropdown'
import { ComponentContext } from '..'
import { clientHeight } from '../../config'

const { Header } = Layout

export default function HeaderPage(): JSX.Element {

    const [full, setFull] = useState(false)
    const context = useContext(ComponentContext)
    let timer: any;

    const toggleFull = async () => {
        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen()
            setFull(true)
        } else {
            if (document.exitFullscreen) {
                setFull(false)
                await document.exitFullscreen()
            }
        }
        timer = setTimeout(() => {
            if (context.setClientHeight) {
                context.setClientHeight(clientHeight())
            }
        }, 100)
    }

    useEffect(() => {
        return () => {
            clearTimeout(timer)
        }
    }, [timer])

    return <Header
        className={styles["site-layout-background"]}
        style={{ width: `calc(100% - ${context.collapsed ? 80 : 200}px)` }}>
        {createElement(MenuUnfoldOutlined, {
            className: 'trigger',
            onClick: () => context.setCollapsed(!context.collapsed)
        })}
        <div className={styles['right-content']}>
            <div className={styles.full} onClick={toggleFull}>
                {full ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
            </div>
            <AvatarDropdown />
        </div>
    </Header>
}
