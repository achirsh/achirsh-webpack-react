import { ReactElement } from 'react'

interface IMenuChild {
    key: string,
    value: string,
    path: string
}

interface IMenu {
    key: string,
    value: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    icon?: ReactElement,
    path?: string,
    child?: IMenuChild[]
}


export {
    IMenu,
    IMenuChild
}
