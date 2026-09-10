# 六个游戏页优化与推广准备

状态：已于 2026-09-10 部署至 pokopie.com，版本 `0e5a33d1-6aa6-4e66-a633-ae25e5529f50`。六个重点页面均已确认返回 HTTP 200 并显示新内容；实际试玩仍待验证。本文中的推广内容仅为草稿，没有对外发布。

## Search Console 基线

来源：用户提供的 2026-09-10 导出文件，数据范围为 2026-06-09 至 2026-09-08，搜索类型为网页。

| 英文游戏页 | 展示 | 点击 | CTR | 平均排名 |
| --- | ---: | ---: | ---: | ---: |
| Murdoku | 1,331 | 2 | 0.15% | 10.69 |
| Onet Master | 282 | 0 | 0% | 8.41 |
| Geometry Dash Advance | 577 | 75 | 13.00% | 8.07 |
| Three Wonders | 780 | 53 | 6.79% | 8.67 |
| Pipi and Bibis | 767 | 63 | 8.21% | 6.57 |
| Taiko Web | 267 | 3 | 1.12% | 15.22 |

最近 28 天总点击为 1,015，前一个 28 天为 310；展示分别为 15,499 和 8,281。游戏页占导出页面点击约 81.1%，博客约 1.8%。优先改善已有搜索需求的游戏页。

查询导出只覆盖约 32% 的总点击，页面汇总与图表总计也不同。不能把独立的查询表与页面表强行配对，或据此断言收录、外链是当前瓶颈。以上六页数字是完整导出期间的累计值，不是最近 28 天数据。

## 本轮修改

- 六个英文页面采用独立简介、版本说明、玩法、提示和参考来源；非英文内容保留现有逻辑。
- Murdoku 补上行列排除与同区域推理规则；Onet 修正为最多两次转弯、三段直线，不再套用 Mahjong 的边缘规则。
- Three Wonders 修正三个模式：Midnight Wanderers 为动作平台、Chariot 为飞行射击、Don’t Pull 为推块益智。
- Geometry 明确为社区 GBA demake，并链接原作者项目；不保证播放器与最新发布版本一致。
- Pipi 修正 Shredder Beam 与放置炸弹后逃生的玩法，提示原作成人主题。Taiko 的按键注明来自上游说明，外设能力以当前播放器为准。
- 六页手机端标题和播放入口前移，介绍和嵌入代码后移；Three Wonders、Pipi 增加页内播放器。
- Murdoku 与 Onet、Three Wonders 与 Pipi 互加相关内链。
- 增加 `player_ready` 事件：只在当前 iframe 发来就绪消息时记录，每次尝试去重；iframe 的 load 事件不会被算作就绪。

## 验证与待办

2026-09-10 检查：六个生产详情页与六个 `/play` 页面均返回 HTTP 200，播放页包含上游 iframe。这证明页面与入口可访问，不代表游戏可以实际游玩，也不是新改动的线上验收。

本地 `npm run check` 通过：35 个测试文件、136 项测试，类型检查及生产构建通过。浏览器连接超时，桌面和手机的实际启动、音频、输入及画面尚未验证。

上游字段仍有待核实：Pipi 的 URL 年份为 1991，Toaplan 官方资料写 1992；Onet 的发布方和年份可能对应不同版本。本轮保留既有 URL 与上游字段，待实际加载版本明确后再统一。

参考来源随页面展示，集中维护在 `src/lib/game-editorial.ts`。核心来源包括 [Murdoku 规则](https://murdoku.com/pdf/the-courtroom-bw.pdf)、[Onet Master 发布页](https://poki.com/en/g/onet-master)、[Geometry 原作者项目](https://github.com/AleFunky/geometry_dash_advance)、[Capcom 手册第 23 页](https://static.capcom.com/cccr/manuals/PSP_Manual.pdf) 和 [Toaplan 玩法资料](https://www.toaplangames.co.jp/en/license/license-21.html)。

## 小规模推广草稿

上线并完成实际试玩后，选择允许自我推广且主题匹配的社区，先人工发布一篇。确认社区规则和发布位置，不批量投递，不购买排名外链。Pipi 不作为首轮推广对象。

### 草稿 A：Geometry / GBA 社区

Title: A browser entry and control guide for Geometry Dash Advance

Disclosure: I run POKOPIE. I’ve updated our page for Geometry Dash Advance, AleFunky’s community GBA demake, with version context and a control guide. The page links to the original developer repository; the embedded build may differ from the latest release.

If you’re interested in how Geometry Dash was adapted to GBA, the original project is here: https://github.com/AleFunky/geometry_dash_advance

Our browser entry and guide: https://pokopie.com/en/games/geometry-dash-advance-gba-2025

### 草稿 B：街机社区

Title: Three Wonders: a guide to its three different games

Disclosure: I run POKOPIE. I’ve revised our Three Wonders guide to explain its three modes: Midnight Wanderers is the action-platform adventure, Chariot is the flying shooter, and Don’t Pull is the block-pushing puzzle game. The page includes a browser player and a reference to Capcom’s manual.

Guide: https://pokopie.com/en/games/three-wonders-arcade-1991

Which of the three did you spend the most time playing?

## 上线后的复盘

记录实际部署日期，等待至少 14 天完整数据，再导出相邻且等长的上线前后窗口。按页面比较点击、展示、CTR、排名，同时查看国家与设备组合变化；不要把全站增长直接归因于本次修改。

优先观察 Murdoku、Onet 的点击与 CTR，其次观察 Geometry、Three Wonders 的搜索点击和播放行为。样本小或排名变化较大时继续观察，不用固定的 CTR 涨幅作为承诺。

分析事件可参考 `game_play_click`、`player_load_start`、`player_frame_loaded` 和 `player_ready`。就绪消息仍不代表用户开始游玩；上游不发消息、用户不同意分析或拦截器也会导致缺失。计算转化需检查实际 GA4 数据、会话去重与事件覆盖，不能直接把事件次数相除当作用户转化率。
