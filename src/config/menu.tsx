import {
    UserOutlined,
    VideoCameraOutlined
} from '@ant-design/icons'

const menu = [
    {
        key: 'ANTD',
        value: 'ANTD',
        icon: <UserOutlined />,
        child: [
            {
                key: 'LIST',
                value: '列表',
                path: '/'
            }
        ]
    },
    {
        key: 'survey',
        value: '调查问卷',
        icon: <VideoCameraOutlined />,
        child: [
            {
                key: 'template',
                value: '问卷调查模板',
                path: '/con/survey/template'
            },
            {
                key: 'plan',
                value: '问卷计划管理',
                path: '/con/survey/plan'
            },
            {
                key: 'statistical',
                value: '问卷统计',
                path: '/con/survey/statistical'
            },
        ]
    }
]

export {
    menu
}
