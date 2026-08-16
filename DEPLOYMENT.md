# POKOPIE 部署清单

## 域名

生产域名：

- `https://pokopie.com`
- `https://www.pokopie.com`

`wrangler.jsonc` 已配置这两个 Cloudflare Workers 自定义域名。部署前需要确认 `pokopie.com` 已接入当前 Cloudflare 账号，并且 DNS/zone 权限可用。

`www.pokopie.com` 会使用 `308` 永久重定向到 `https://pokopie.com`，并保留原始路径和查询参数。

## 上线前配置

当前已设置：

- `SITE_NAME`: `POKOPIE`
- `SITE_SLOGAN`: `Play Retro Games on POKOPIE`
- `SITE_EMAIL`: `hughhao7@gmail.com`
- `SITE_THEMES`: `cyberpunk`
- `SITE_TEMPLATE`: `poki-like`
- `GGEMU_REFCODE`: `v2pRNT`
- `GOOGLE_ADSENSE_CLIENT`: `ca-pub-3274781156049995`

仍需按业务确认：

- `GOOGLE_ANALYTICS_ID`: Google Analytics ID

## Google 广告同意管理

代码已在 Google 标签加载前将 Consent Mode v2 的广告、广告个性化、广告用户数据和分析存储默认设为 `denied`。上线前仍必须在 AdSense 后台完成以下配置：

AdSense 代码仅在本地化首页、游戏详情页和博客内容页加载。游戏游玩页、嵌入页、直播页、本地 ROM 工具、About、Privacy、Terms 及未知路径不会加载广告，避免在第三方框架或低价值页面产生广告请求。

1. 打开「Privacy & messaging」，创建并发布 European regulations message。
2. 确认使用 Google 认证并支持 IAB TCF 的 CMP；Google 自带的 European regulations message 满足该认证要求。
3. 将隐私政策 URL 配置为 `https://pokopie.com/en/privacy-policy`，并为其他语言提供站内入口。
4. 在 European regulations message 设置中启用广告和分析用途的 Consent Mode。
5. 配置拒绝、同意和管理选项，并确认页面底部显示「Privacy and cookie settings」撤回入口。
6. 使用 `?fc=alwaysshow` 在 EEA 测试环境验证消息、拒绝流程、同意流程和撤回流程。

未完成并发布认证 CMP 前，不应面向 EEA、英国或瑞士流量启用个性化广告。

不要把服务端密钥放进 `VITE_` 前缀变量。当前项目没有必须配置的密钥。

## 本地检查

```bash
npm run generate-routes
npm run check
npm run deploy:dry-run
```

`npm run check` 会依次执行类型检查、测试和生产构建。

提交到 `main` 或创建 Pull Request 时，GitHub Actions 也会自动执行相同检查。

## 部署

```bash
npm run deploy
```

部署完成后检查：

- `https://pokopie.com/api/health`
- `https://pokopie.com/robots.txt`
- `https://pokopie.com/sitemap.xml`
- `https://pokopie.com/zh-CN`
- `https://pokopie.com/en`
- `https://pokopie.com/ja`

## 注意事项

- 游戏数据、博客数据、直播房和游戏 iframe 依赖 `https://ggemu.com`。
- 游戏播放页和直播房链接会携带 GGEMU 推荐码 `v2pRNT`。
- `/api/health` 同时检查 POKOPIE Worker 和 GGEMU 上游服务，并返回上游延迟。
- Cloudflare Workers Observability 已启用完整 invocation logs，可在 Cloudflare Dashboard 查询生产日志。
- Cloudflare Workers Caching 已启用。成功的 SSR HTML 不写入浏览器缓存，在 Cloudflare 边缘缓存 5 分钟，并最多使用 24 小时的旧副本执行后台刷新；错误响应不进入缓存。
- TanStack Server Function 默认使用 `no-store`；只有显式声明缓存策略的函数响应才允许进入缓存，避免搜索和实时数据被 Cloudflare 的默认 TTL 长时间缓存。
- 发布后使用响应头中的 `CF-Cache-Status` 验证边缘缓存；同一路径连续请求应从 `MISS` 变为 `HIT`。
- `wrangler.jsonc` 当前没有 KV、D1、R2 等绑定。
