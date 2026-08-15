# POKOPIE 部署清单

## 域名

生产域名：

- `https://pokopie.com`
- `https://www.pokopie.com`

`wrangler.jsonc` 已配置这两个 Cloudflare Workers 自定义域名。部署前需要确认 `pokopie.com` 已接入当前 Cloudflare 账号，并且 DNS/zone 权限可用。

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
- 发布后使用响应头中的 `CF-Cache-Status` 验证边缘缓存；同一路径连续请求应从 `MISS` 变为 `HIT`。
- `wrangler.jsonc` 当前没有 KV、D1、R2 等绑定。
