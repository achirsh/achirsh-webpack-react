/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-find-dom-node */
import { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { ComponentContext } from '../../components'
import { useParams } from 'react-router-dom'

export default function IframePage(): JSX.Element {

    const context = useContext(ComponentContext)
    const [iframeRef, setIframeRef] = useState<any>('')
    const [iFrameHeight, setIFrameHeight] = useState('0px')
    const [path, setPath] = useState('')
    const { key, value } = useParams()

    useEffect(() => {
        if (key && value) {
            setPath(key + '/' + value)
        }
    }, [key, value])

    return <iframe
        style={{
            width: '100%', height: '100%', overflow: 'visible',
            border: 'node'
        }}
        src={'http://localhost:8000/control/' + path}
        ref={(el: any) => setIframeRef(el)}
        onLoad={() => {
            const obj: any = ReactDOM.findDOMNode(iframeRef)
            obj.contentWindow.postMessage(JSON.stringify(context), '*')
        }}
    />
}

