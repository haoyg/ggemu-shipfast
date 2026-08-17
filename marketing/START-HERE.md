# 外链执行 · 从这里开始

> 钩子始终是**工具页**，不是版权游戏目录：
> - PS1 兼容性检测 → https://pokopie.com/en/ps1-compatibility
> - Play My ROM → https://pokopie.com/en/play-my-rom

进度在 `outreach-tracker.csv` 更新（每条记录 date / response / live_url）。

---

## 第 0 步：先确认落地页"值得被链"（30 分钟，做一次）

编辑收不收录，只看落地页质量。提交前确认：

- [ ] `/en/ps1-compatibility` 有清晰的**方法论说明**（检测了哪些 API：WebAssembly / WebGL2 / IndexedDB / gamepad / fullscreen / SharedArrayBuffer）
- [ ] 有**局限声明**（"API 可用 ≠ 游戏一定流畅"）
- [ ] 检测**纯本地运行、不上传设备信息/ROM**（这句是社区和编辑最看重的信任点）
- [ ] `/en/play-my-rom` 明确"仅供你**合法拥有**的 ROM"

页面没达到就先补页面 —— 这比发 pitch 重要。

## 第 1 周：目录提交（当天见效，无需求人）

用 `outreach-templates.md` 里的 **Directory submission copy**。按顺序做，每条做完在 tracker 里填 `live_url`：

1. Product Hunt（主发布渠道，准备好画廊图 + maker 评论，选好日期）
2. BetaList
3. Uneed
4. Fazier
5. AlternativeTo（选"desktop 模拟器"作为 alternative）
6. Sloop / Launching Next / PitchWall / BetaPage（批量走完）

> 规则：只填品牌锚文本；付费排名位一律跳过；提交后记录是否被 index。

## 第 2–4 周：编辑 / 资源页外链（质量最高）

用 **Resource-page email** / **Editorial pitch** 模板，目标见 tracker 的 `retro editorial` 行。

铁律（照抄 kit 的 Operating rules）：
- 每封必须引用对方**一篇具体文章的具体段落**，`[specific detail]` 不能空
- 每周 ≤ 10 封新 pitch
- 7 天后跟进一次，之后收线
- **绝不**要求关键词锚文本

## 持续：社区（先贡献，后提及）

r/emulation、Libretro 论坛、EmulatorJS discussions、HN Show HN。
先答疑/参与 → 契合的帖子里带链接 → 披露"我是作者"。
HN Show HN 留到生产页稳定时一次性打。

## 最高杠杆（安排一次，长期回报）

写一篇能独立成立的技术文章发 dev.to / Hashnode：
《浏览器端 PS1 模拟器的能力预检怎么做》——文中自然引用检测页做 demo。
这类"技术案例 + 工具"最容易被自然转载和二次引用。

---

## 红线（别碰）

- 不买传递权重的链接、不用自动群发工具、不做 PBN
- 付费位置标 `rel="sponsored"`；`nofollow` / `ugc` 照单全收
- 不堆砌锚文本
