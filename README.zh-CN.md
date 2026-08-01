# POKOPIE / GGEMU ShipFast

<p align="center">
  <a href="./README.md">English</a> · 简体中文
</p>

<p align="center">
  <strong>快速上线你的复古游戏网站。</strong><br />
  当前项目已按 POKOPIE 品牌、pokopie.com 域名和复古游戏主题完成基础上线配置。
</p>

## 项目概览

这是一个基于 GGEMU ShipFast 的浏览器复古游戏站点模板。它使用共享的 GGEMU 游戏、博客和直播数据，让你可以快速部署一个独立品牌的游戏网站，而不需要自己维护 ROM、模拟器或数据库。

当前站点品牌：

- 站点名称：`POKOPIE`
- 生产域名：`pokopie.com`
- 联系邮箱：`contact@pokopie.com`
- 默认主题：`pokopie`
- 推荐码：`v2pRNT`

## 技术栈

- React 19
- TanStack Start
- TanStack Router
- Vite
- TypeScript
- Cloudflare Workers
- DaisyUI

## 主要功能

- 多语言页面：中文、英文、日文
- 游戏列表、搜索、筛选和排序
- 游戏详情页、FAQ、SEO metadata 和结构化数据
- 浏览器内游戏播放页
- 本地 ROM 播放入口
- 游戏直播列表和嵌入式直播播放器
- 博客列表和博客详情
- 复古游戏主题和品牌 Logo
- PWA manifest、站点图标和分享图
- robots.txt、sitemap.xml 和健康检查接口
- Cloudflare Workers 部署配置

## 本地开发

安装依赖：

```bash
npm install
```

启动开发服务器：

```bash
npm run dev
```

生成路由：

```bash
npm run generate-routes
```

完整检查：

```bash
npm run check
```

`npm run check` 会执行类型检查、测试和生产构建。

## 部署

部署前先执行 dry-run：

```bash
npm run deploy:dry-run
```

正式部署：

```bash
npm run deploy
```

部署后检查：

- `https://pokopie.com/api/health`
- `https://pokopie.com/robots.txt`
- `https://pokopie.com/sitemap.xml`
- `https://pokopie.com/zh-CN`
- `https://pokopie.com/en`
- `https://pokopie.com/ja`

更多上线细节见 [DEPLOYMENT.md](./DEPLOYMENT.md)。

## 配置

默认配置在 [siteconfig.js](./siteconfig.js)：

| 配置项 | 说明 |
| --- | --- |
| `SITE_NAME` | 站点名称 |
| `SITE_SLOGAN` | 站点标语 |
| `SITE_EMAIL` | 联系邮箱 |
| `SITE_TEMPLATE` | 首页模板 |
| `SITE_THEMES` | 可用主题 |
| `GGEMU_REFCODE` | GGEMU 推荐码 |
| `GOOGLE_ADSENSE_CLIENT` | Google AdSense client ID |
| `GOOGLE_ANALYTICS_ID` | Google Analytics ID |

Cloudflare 运行时变量优先级高于本地 `siteconfig.js`。不要把服务端密钥放到 `VITE_` 前缀变量里。

## 首页模板

`SITE_TEMPLATE` 当前支持：

- `default`
- `two-column`
- `poki-like`
- `features`
- `sidenav`

## 注意事项

- 游戏数据、博客数据、直播房间和游戏 iframe 依赖 `https://ggemu.com`。
- 当前项目没有数据库绑定，也没有 KV、D1、R2 等 Cloudflare 资源绑定。
- `src/routeTree.gen.ts` 是生成文件，不要手动编辑；路由变更后运行 `npm run generate-routes`。
- TanStack Start 代码默认同构。涉及密钥、数据库或文件系统的逻辑应放在服务端函数或服务端专用模块里。

## 许可证

本项目基于 Apache License, Version 2.0 授权。详见 [LICENSE](./LICENSE) 和 [NOTICE](./NOTICE)。
