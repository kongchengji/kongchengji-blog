import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'

export default defineUserConfig({
  title: '空城机の博文',  // 名称
  description: '这是使用vuepress-reco进行的第一次配置',  // 描述
  dest: './dist',  // 打包文件的位置
  port: 9074,  // 运行端口号
  // 添加到html的head顶部的东西
  head: [
    ['link', { rel: 'icon', href: './img/icon.svg' }],
    ['meta', { name: 'keywords', content: '空城机的个人博客网页' }],  
    ['meta', { name: 'description', content: '空城机的个人博客网页' }],  
    ['meta', { name: 'author', content: '空城机' }],  
    ['meta', { name: 'robots', content: 'all' }],  
  ],
  // 主题配置
  theme: recoTheme({
    // style: '@vuepress-reco/style-default',
    logo: '/img/icon.svg',
    author: 'kongchengji',
    // series 为原 sidebar
    series: {
      '/docs/theme-reco/': [
        {
          text: 'module one',
          children: ['home', 'theme']
        },
        {
          text: 'module two',
          children: ['api', 'plugin']
        }
      ]
    },
    navbar: 
    [
      { text: '首页', link: '/' },
      { text: 'Categories', link: '/categories/category1/1/' },
      { text: 'Tags', link: '/tags/tag1/1/' },
      { text: 'Docs',
        children: [
          { text: 'vuepress-reco', link: '/docs/theme-reco/theme' },
          { text: 'vuepress-theme-reco', link: '/blogs/other/guide' }
        ]
      },
    ],
    // 公告，我目前不需要，直接注释掉即可
    // bulletin: {
    //   body: [
    //     {
    //       type: 'text',
    //       content: `🎉🎉🎉 `,
    //       style: 'font-size: 12px;'
    //     },
    //   ],
    // },
    // valineConfig 配置与 1.x 一致
    // valineConfig: {
    //   appId: 'xxx',
    //   appKey: 'xxx',
    //   placeholder: '填写邮箱可以收到回复提醒哦！',
    //   verify: true, // 验证码服务
    //   // notify: true,
    //   recordIP: true,
    //   // hideComments: true // 隐藏评论
    // },
  }),
  // debug: true,
})
