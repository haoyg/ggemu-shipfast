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
- `SITE_EMAIL`: `contact@pokopie.com`
- `SITE_THEMES`: `pokopie,dark`
- `SITE_TEMPLATE`: `default`
- `GGEMU_REFCODE`: `v2pRNT`

仍需按业务确认：

- `GOOGLE_ANALYTICS_ID`: Google Analytics ID
- `GOOGLE_ADSENSE_CLIENT`: Google AdSense client ID

不要把服务端密钥放进 `VITE_` 前缀变量。当前项目没有必须配置的密钥。

## 本地检查

```bash
npm run generate-routes
npm run check
npm run deploy:dry-run
```

`npm run check` 会依次执行类型检查、测试和生产构建。

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
- `/api/health` 只检查 POKOPIE Worker 是否可响应，不检查 GGEMU 外部服务。
- `wrangler.jsonc` 当前没有 KV、D1、R2 等绑定。
