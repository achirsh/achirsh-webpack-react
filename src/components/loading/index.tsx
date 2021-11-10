import { CSSProperties, useContext } from 'react'
import { Spin } from 'antd'
import { ComponentContext } from '..'

export interface ILoadingProps {
    spin?: boolean,
    progress?: boolean,
    tip?: string,
    style?: CSSProperties
}

export default function Loading(props: ILoadingProps): JSX.Element {

    const {
        style,
        spin,
        progress,
        ...others
    } = props

    let { tip } = props

    const context = useContext(ComponentContext)

    const wrapperStyle: CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        cursor: 'not-allowed',
        zIndex: 9999,
        ...style,
    }

    if (!tip && context) tip = context.loadingTip

    if (!spin) return <div />

    return (<div style={wrapperStyle} {...others}>
        <Spin spinning tip={tip} />
    </div>);
}
