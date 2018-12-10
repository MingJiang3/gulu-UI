module.exports = {
    title: 'Gulu  UI',
    description: 'this is ui',
    themeConfig: {
        nav: [
            {text: '指南', link: '/'},
            {text: '配置', link: ''},
            {text: '更多', link: ''},
        ],
        sidebar: [
            {
                title: '入门',
                children: ['/install/', '/started/']
            },
            {
                title: '组件',
                children: ['/components/button']
            }
        ]
    }
}