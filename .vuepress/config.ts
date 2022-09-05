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
    authorAvatar: '/img/home/headportrait.jpg',
    // series 为原 sidebar
    series: {
      '/docs/highPerformanceJavaScript/': [
        {
          text: '高性能JavaScript',
          children: [
            'hpjs01.md', 'hpjs02.md', 'hpjs03.md', 'hpjs04.md', 'hpjs05.md', 'hpjs06.md', 'hpjs07.md', 'hpjs08.md'
          ]
        }
      ]
    },
    navbar: 
    [
      { text: '首页', link: '/' },
      { text: '博客专栏', 
        children: [
          { text: '高性能JavaScript', link: '/docs/highPerformanceJavaScript/hpjs01' },
        ]
      },
      { text: '标签索引', link: '/tags/gaoxingnenJavaScript/1/' },
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
