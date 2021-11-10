import { Layout } from 'antd'
import styles from './layout.module.scss'
import { useContext, ReactNode } from 'react'
import { ComponentContext } from '..'

interface IProps {
    children: ReactNode
}

const { Content } = Layout

export default function AppRouter(props: IProps) {
    const context = useContext(ComponentContext)

    return (
        <Content
            className={styles["site-layout-background"]}
            style={{
                margin: "84px 16px 24px",
                padding: 24,
                height: (context.clientHeight || 112) - 112
            }}
        >
            {props.children}
        </Content>
    )
}


