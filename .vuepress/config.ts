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
      ],
      '/docs/nodeblog/': [
        {
          text: 'node学习专栏',
          children: [
            'Node1.md',
            'NodeJs深入浅出之旅：模块.md',
            'NodeJs深入浅出之旅：包与NPM.md',
            'NodeJs深入浅出之旅：异步I!O （上）.md',
            'NodeJs深入浅出之旅：异步I!O （中）.md',
            'NodeJs深入浅出之旅：异步I!O （下）.md',
            'NodeJs深入浅出之旅：V8内存分配.md',
            'NodeJs深入浅出之旅：内存控制（上）.md',
            'NodeJs深入浅出之旅：内存控制（下）.md',
            'NodeJs深入浅出之旅：文件系统.md',
            'NodeJs深入浅出之旅：理解Buffer.md',
            'SocketIO の 聊天练习.md',
            'node爬虫爬取小说章节.md',
            'Node连接MongoDB（一）.md',
            'Node の MongoDB Driver.md',
            'node の SQLite.md',
          ]
        }
      ],
      '/docs/typescript/': [
        {
          text: 'Typescript学习专栏',
          children: [
            '从0开始的TypeScriptの一.md',
            '从0开始的TypeScriptの二.md',
            '从0开始的TypeScriptの三：TS的类型.md',
            '从0开始的TypeScriptの四：接口Interfaces · 上.md',
            '从0开始的TypeScriptの五：webpack打包typescript.md',
            '从0开始的TypeScriptの六：webpack5热更新打包TS.md',
            '从0开始的TypeScriptの七：函数.md',
            '从0开始的TypeScriptの八：类.md',
            '从0开始的TypeScriptの九：接口Interfaces · 中.md',
            '从0开始的TypeScriptの十：泛型.md',
            '从0开始的TypeScriptの十一：模块和命名空间.md',
            '从0开始的TypeScriptの十二：装饰器.md',
            '从0开始的TypeScriptの十三： infer、extends、keyof、typeof、in.md',
          ]
        }
      ],
      '/docs/threeJs/': [
        {
          text: 'ThreeJs学习专栏',
          children: [
            'Three.Js杂记1.md', 
            'Three.js杂记2.md', 
            'Three.js杂记3.md',
            'Three.js杂记4.md',
            'Three.js杂记5.md',
            'Three.js杂记6.md',
            'Three.js杂记7.md',
            'Three.js杂记8.md',
            'Three.js杂记9.md',
            'Three.js杂记10.md',
            'Three.js杂记11.md',
            'Three.js杂记12.md',
          ]
        }
      ],
    },
    navbar: 
    [
      { text: '首页', link: '/' },
      { text: '博客专栏', 
        children: [
          { text: '高性能JavaScript', link: '/docs/highPerformanceJavaScript/hpjs01' },
          { text: 'node学习', link: '/docs/nodeblog/Node1' },
          { text: 'Typescript学习', link: '/docs/typescript/cong0kaishideTypeScriptのyi' },
          { text: 'ThreeJs学习', link: '/docs/threeJs/Three.Jszaji1' },
        ]
      },
      { text: '标签索引', link: '/tags/gaoxingnenJavaScript/1/' },
      { text: '关于我', 
        children: [
          { text: 'CSDN', link: 'https://blog.csdn.net/qq_36171287' },
          { text: '掘金', link: 'https://juejin.cn/user/2357005414307127' },
          { text: '码云', link: 'https://gitee.com/wzckongchengji' },
          { text: 'Github', link: 'https://github.com/kongchengji' },
          { text: 'infoQ', link: 'https://www.infoq.cn/u/kongchengji/publish' },
          { text: '华为云', link: 'https://bbs.huaweicloud.com/community/usersnew/id_1628347319379041' },
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

