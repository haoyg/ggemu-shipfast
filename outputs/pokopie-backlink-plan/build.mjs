import fs from 'node:fs/promises'
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool'

const outputDir = new URL('.', import.meta.url).pathname
const checkedAt = new Date('2026-10-29T00:00:00+08:00')
const pokopie = {
  brawl: 'https://pokopie.com/guides/brawl-stars',
  codes: 'https://pokopie.com/guides/brawl-stars/creator-codes',
  retro: 'https://pokopie.com/en',
  mCards: 'https://pokopie.com/en/card-games-that-start-with-m',
}

const rows = [
  ['A', '复古游戏投稿', 'Respawn Magazine', 'https://www.respawnmag.com/write-for-us', '客座文章', '可立即联系', pokopie.retro, '投稿：浏览器如何降低复古游戏体验门槛，并以 POKOPIE 的兼容性测试作为实例。', 'Hugh', '发送个性化选题邮件', 'mike@respawnmag.com', checkedAt, '已验证投稿页和编辑邮箱；主题高度相关。', ''],
  ['A', '复古游戏投稿', 'Retro Format', 'https://www.retro-format.com/writeforus.php', '杂志投稿', '可立即联系', pokopie.retro, '投稿：现代浏览器中的 GBA、NES 与 SNES 游戏体验对比。', 'Hugh', '先询问网页文章是否允许引用作者项目', 'editorial@retro-format.com', checkedAt, '已验证长期招募复古游戏作者。', ''],
  ['A', '游戏媒体投稿', 'God is a Geek', 'https://godisageek.com/write-for-us/', '作者申请', '可立即联系', pokopie.brawl, '申请写 Brawl Stars 实用指南或复古游戏专题，正文中只在确有参考价值时引用 POKOPIE。', 'Hugh', '阅读完整要求后提交作者申请', '页面申请入口', checkedAt, '已验证投稿说明；编辑门槛较高，但站点质量好。', ''],
  ['A', '游戏媒体投稿', 'GameCritics', 'https://gamecritics.com/write-for-us/', '志愿作者', '可立即联系', pokopie.retro, '投稿：浏览器复古游戏平台体验评测，重点写测试方法而非推广。', 'Hugh', '按页面要求准备试稿', '页面申请入口', checkedAt, '已验证为非营利游戏评论站，接受志愿作者。', ''],
  ['A', '复古游戏投稿', 'Retro Garden', 'https://www.retrogarden.co.uk/write-for-us/', '客座文章', '待人工复核', pokopie.mCards, '投稿：从 Whist 到现代卡牌游戏的规则演变，可引用 M 开头卡牌游戏资料页。', 'Hugh', '浏览器人工打开并确认提交方式', '待确认', checkedAt, '搜索结果确认有投稿页，但自动访问返回 202。', ''],
  ['A', '复古游戏投稿', 'Retroheadz', 'https://www.retroheadz.com/write-for-retroheadz/', '作者投稿', '待人工复核', pokopie.retro, '投稿：经典掌机游戏如何在现代设备上被重新发现。', 'Hugh', '确认投稿页仍在接收文章', '待确认', checkedAt, '搜索结果存在明确投稿页，自动访问被中断。', ''],
  ['B', '游戏媒体投稿', 'Punished Backlog', 'https://punishedbacklog.com/write-for-us/', '志愿作者', '待人工复核', pokopie.retro, '投稿：网页版复古游戏的可用性、保存机制与控制器支持。', 'Hugh', '检查当前招募状态和外链政策', '页面申请入口', checkedAt, '搜索结果确认作者招募页。', ''],
  ['B', '游戏媒体投稿', 'Hey Poor Player', 'https://www.heypoorplayer.com/write-for-us/', '作者申请', '待人工复核', pokopie.retro, '投稿：一款经典游戏的历史回顾，POKOPIE 仅作为可试玩参考。', 'Hugh', '人工打开页面并确认申请要求', '页面申请入口', checkedAt, '页面存在但自动访问仅返回 202。', ''],
  ['B', '游戏媒体投稿', 'GamingTrend', 'https://gamingtrend.com/write-for-us/', '作者申请', '待人工复核', pokopie.brawl, '投稿：Brawl Stars 活动信息如何核验，使用官方来源和更新时间。', 'Hugh', '确认是否接受自由投稿', '待确认', checkedAt, 'Bing 已索引投稿页，访问时发生跳转中断。', ''],
  ['B', '复古游戏投稿', 'The Gaming Archives', 'https://thegamingarchives.net/write-for-us/', '客座文章', '待人工复核', pokopie.retro, '投稿：复古游戏资料保存与浏览器访问的发展。', 'Hugh', '确认站点活跃度和编辑邮箱', '待确认', checkedAt, '投稿页可被搜索到，但加载不稳定。', ''],
  ['B', '复古游戏投稿', 'RetroNuke', 'https://retronuke.com/write-about-video-games/', '客座文章', '待人工复核', pokopie.mCards, '投稿：文学作品中的经典纸牌游戏与现代搜索需求。', 'Hugh', '人工确认页面和署名外链规则', '待确认', checkedAt, 'Bing 已索引明确投稿页面，但加载超时。', ''],
  ['B', '复古游戏投稿', 'Retro Replay', 'https://retro-replay.com/write-for-us/', '客座文章', '待人工复核', pokopie.retro, '投稿：浏览器模拟与原硬件体验的差异。', 'Hugh', '确认页面仍有效后再联系', '待确认', checkedAt, '投稿页搜索可见，但自动访问超时。', ''],
  ['B', '复古游戏媒体', 'Indie Retro News', 'https://www.indieretronews.com/', '新闻线索', '待人工复核', pokopie.retro, '提供可报道的数据角度：多平台复古游戏目录、浏览器兼容性与新上线功能。', 'Hugh', '查找站内联系邮箱或社交账号', '待确认', checkedAt, '高相关媒体；只适合有真实新闻点时联系。', ''],
  ['B', '复古游戏媒体', 'Retro Dodo', 'https://retrododo.com/contact/', '新闻线索', '待人工复核', pokopie.retro, '提供浏览器复古游戏趋势、平台数据或独家测试结果。', 'Hugh', '确认联系页并准备数据型选题', '联系页', checkedAt, '高权威目标，成功率低；不能发送普通推广邮件。', ''],
  ['B', '复古游戏媒体', 'Time Extension', 'https://www.timeextension.com/contact', '新闻线索', '待人工复核', pokopie.retro, '仅在 POKOPIE 有独家数据或重要产品更新时提供新闻线索。', 'Hugh', '确认编辑联系方式', '联系页', checkedAt, '高质量媒体，访问受防护；需要强新闻价值。', ''],
  ['B', 'Brawl Stars 内容', 'MobileMatters', 'https://mobilematters.gg/brawl-stars/brawl-stars-creator-codes', '资料补充', '待人工复核', pokopie.codes, '指出可验证的代码来源、遗漏创作者或过期步骤，并提供可引用的数据出处。', 'Hugh', '先完成逐项差异检查，再联系编辑', '待查联系页', checkedAt, '不要直接索要链接；只有发现可证实差异时联系。', ''],
  ['B', 'Brawl Stars 内容', 'TechySnoop', 'https://techysnoop.com/brawl-stars-creator-codes/', '资料补充', '待人工复核', pokopie.codes, '提供来源标注和验证日期方面的补充，并建议引用完整核验表。', 'Hugh', '比较代码表和更新时间', '待查联系页', checkedAt, '只有页面确实缺少信息时才发送。', ''],
  ['B', 'Brawl Stars 内容', 'Mobi.gg', 'https://mobi.gg/en/codes/brawl-stars-codes/', '资料补充', '待人工复核', pokopie.codes, '提供 creator code 与 redeem code 的意图区分以及官方使用路径。', 'Hugh', '检查术语或步骤是否存在错误', '待查联系页', checkedAt, '编辑型机会，避免泛泛推广。', ''],
  ['C', 'Brawl Stars 内容', 'Games N Fans', 'https://www.gamesnfans.tv/game-guide/brawl-stars-creator-codes', '资料补充', '待人工复核', pokopie.codes, '如果其代码列表过期，提供带来源和核验日期的更新参考。', 'Hugh', '确认页面活跃度和联系入口', '待查联系页', checkedAt, '先验证质量，低质量则放弃。', ''],
  ['C', '游戏目录', 'PLIX.GG', 'https://plix.gg/submit-game', '游戏提交', '不适用，暂缓', pokopie.retro, '只有在平台允许提交聚合站或单个可授权游戏时才考虑。', 'Hugh', '不要提交，先确认版权和平台规则', '提交表单', checkedAt, 'POKOPIE 不是原创游戏开发者，当前不应冒充开发者提交。', ''],
]

const workbook = Workbook.create()
const sheet = workbook.worksheets.add('外链机会')
sheet.showGridLines = false
sheet.tabColor = '#2563EB'

sheet.getRange('A2:N2').merge()
sheet.getRange('A2').values = [['POKOPIE 外链机会跟进表']]
sheet.getRange('A2').format = { font: { name: 'Arial', size: 16, bold: true, color: '#0F172A' } }
sheet.getRange('A3:N3').merge()
sheet.getRange('A3').values = [['首批目标，数据核验日期：2026-10-29。优先做编辑型投稿和资料补充，不购买链接。']]
sheet.getRange('A3').format = { font: { name: 'Arial', size: 10, italic: true, color: '#475569' } }

sheet.getRange('A5:B5').values = [['可立即联系', '待人工复核']]
sheet.getRange('C5:D5').values = [['暂缓', '目标总数']]
sheet.getRange('A5:D5').format = { fill: '#E2E8F0', font: { name: 'Arial', size: 10, bold: true, color: '#0F172A' }, horizontalAlignment: 'center' }
sheet.getRange('A6').formulas = [['=COUNTIF(F9:F28,"可立即联系")']]
sheet.getRange('B6').formulas = [['=COUNTIF(F9:F28,"待人工复核")']]
sheet.getRange('C6').formulas = [['=COUNTIF(F9:F28,"不适用，暂缓")']]
sheet.getRange('D6').formulas = [['=COUNTA(C9:C28)']]
sheet.getRange('A6:D6').format = { font: { name: 'Arial', size: 14, bold: true, color: '#1D4ED8' }, horizontalAlignment: 'center' }

const headers = [['优先级', '类别', '目标网站', '机会页面', '合作方式', '状态', 'POKOPIE 目标页', '推荐选题或联系理由', '负责人', '下一步', '联系方式', '核验日期', '备注', '结果']]
sheet.getRange('A8:N8').values = headers
sheet.getRange('A8:N8').format = {
  fill: '#1E3A8A',
  font: { name: 'Arial', size: 10, bold: true, color: '#FFFFFF' },
  horizontalAlignment: 'center',
  verticalAlignment: 'center',
  wrapText: true,
  borders: { preset: 'inside', style: 'thin', color: '#FFFFFF' },
}
sheet.getRange('A9:N28').values = rows
sheet.getRange('A9:N28').format.font = { name: 'Arial', size: 10, color: '#1E293B' }
sheet.getRange('A9:N28').format.verticalAlignment = 'top'
sheet.getRange('B9:N28').format.wrapText = true
sheet.getRange('A9:A28').format.horizontalAlignment = 'center'
sheet.getRange('F9:F28').format.horizontalAlignment = 'center'
sheet.getRange('I9:I28').format.horizontalAlignment = 'center'
sheet.getRange('L9:L28').setNumberFormat('yyyy-mm-dd')
sheet.getRange('A8:N28').format.borders = { insideHorizontal: { style: 'thin', color: '#E2E8F0' }, bottom: { style: 'thin', color: '#CBD5E1' } }

sheet.getRange('A9:A28').conditionalFormats.add('cellIs', { operator: 'equal', formula: '"A"', format: { fill: '#DCFCE7', font: { bold: true, color: '#166534' } } })
sheet.getRange('A9:A28').conditionalFormats.add('cellIs', { operator: 'equal', formula: '"B"', format: { fill: '#FEF3C7', font: { bold: true, color: '#92400E' } } })
sheet.getRange('A9:A28').conditionalFormats.add('cellIs', { operator: 'equal', formula: '"C"', format: { fill: '#FEE2E2', font: { bold: true, color: '#991B1B' } } })
sheet.getRange('F9:F28').conditionalFormats.add('containsText', { text: '可立即联系', format: { fill: '#DCFCE7', font: { color: '#166534', bold: true } } })
sheet.getRange('F9:F28').conditionalFormats.add('containsText', { text: '待人工复核', format: { fill: '#FEF3C7', font: { color: '#92400E' } } })
sheet.getRange('F9:F28').conditionalFormats.add('containsText', { text: '暂缓', format: { fill: '#FEE2E2', font: { color: '#991B1B' } } })
sheet.getRange('F9:F28').dataValidation = { rule: { type: 'list', values: ['可立即联系', '待人工复核', '已联系', '已回复', '已获得外链', '拒绝', '不适用，暂缓'] } }

const widths = [8, 16, 22, 42, 14, 16, 44, 52, 10, 34, 24, 13, 42, 20]
widths.forEach((width, index) => { sheet.getRangeByIndexes(0, index, 28, 1).format.columnWidth = width })
sheet.getRange('8:8').format.rowHeight = 34
sheet.getRange('9:28').format.rowHeight = 72
sheet.freezePanes.freezeRows(8)
sheet.freezePanes.freezeColumns(3)
sheet.tables.add('A8:N28', true, 'BacklinkTargets')

const drafts = workbook.worksheets.add('联系草稿')
drafts.showGridLines = false
drafts.tabColor = '#60A5FA'
drafts.getRange('A2:E2').merge()
drafts.getRange('A2').values = [['首批英文联系草稿']]
drafts.getRange('A2').format = { font: { name: 'Arial', size: 16, bold: true, color: '#0F172A' } }
drafts.getRange('A3:E3').merge()
drafts.getRange('A3').values = [['发送前请补充个人简介。不要承诺交换链接，也不要要求对方必须保留 POKOPIE 链接。']]
drafts.getRange('A3').format = { font: { name: 'Arial', size: 10, italic: true, color: '#475569' } }
drafts.getRange('A5:E5').values = [['目标网站', '收件方式', '邮件主题', '英文草稿', '发送前检查']]
drafts.getRange('A5:E5').format = {
  fill: '#1E3A8A',
  font: { name: 'Arial', size: 10, bold: true, color: '#FFFFFF' },
  horizontalAlignment: 'center',
  verticalAlignment: 'center',
  wrapText: true,
}
drafts.getRange('A6:E9').values = [
  [
    'Respawn Magazine',
    'mike@respawnmag.com',
    'Pitch: How browser play is changing access to retro games',
    `Hi Mike,\n\nI run POKOPIE, a browser-based retro game discovery site. I would like to pitch an original article about how modern browser technology is changing access to retro games, including the practical limits around controls, saves, mobile compatibility and preservation.\n\nThe article would be written for Respawn Magazine rather than republished from our site. I can include first-hand compatibility observations from building POKOPIE, while keeping the piece useful and non-promotional.\n\nIf this topic fits your editorial calendar, I can send a short outline and sample introduction.\n\nBest,\nHugh`,
    '补充 1 句个人开发经历；不要附带多个链接。',
  ],
  [
    'Retro Format',
    'editorial@retro-format.com',
    'Contributor query: GBA, NES and SNES play in modern browsers',
    `Hello Retro Format editorial team,\n\nI am a developer and the creator of POKOPIE, a browser-based retro game discovery project. I am interested in contributing an article comparing the real-world browser experience of GBA, NES and SNES titles, including input latency, controller support, save behavior and mobile limitations.\n\nI found your contributor guidelines and wanted to ask whether this topic would be suitable for Retro Format or Eight Bit. I can prepare the article to your preferred length and style, with original screenshots and clearly documented testing.\n\nBest regards,\nHugh`,
    '先询问适合哪个刊物；不要在首封邮件要求外链。',
  ],
  [
    'God is a Geek',
    '页面申请入口',
    'Writer application: practical guides and retro gaming features',
    `Hello,\n\nI am a developer, project manager and long-time gaming enthusiast. I would like to apply as a contributor with a focus on practical game guides, browser gaming and retro game history.\n\nI currently operate POKOPIE, which has given me hands-on experience researching game metadata, testing browser compatibility and turning source material into clear guides. I can provide original writing samples and follow your editorial process.\n\nThank you for considering my application.\n\nBest,\nHugh`,
    '准备 2 篇不依赖 POKOPIE 的写作样稿。',
  ],
  [
    'GameCritics',
    '页面申请入口',
    'Volunteer writer application: browser and retro game criticism',
    `Hello GameCritics team,\n\nI am interested in contributing as a volunteer writer. My background is in software development and project management, and I am especially interested in browser games, retro platforms and the technical details that shape the player experience.\n\nI would like to contribute criticism that explains not only whether a game works, but how controls, preservation, accessibility and platform constraints affect it. I can provide an original review sample that follows your published requirements.\n\nBest regards,\nHugh`,
    '严格按照对方试稿要求；该渠道以作者身份为主。',
  ],
]
drafts.getRange('A6:E9').format = { font: { name: 'Arial', size: 10, color: '#1E293B' }, verticalAlignment: 'top', wrapText: true }
drafts.getRange('A5:E9').format.borders = { insideHorizontal: { style: 'thin', color: '#E2E8F0' }, bottom: { style: 'thin', color: '#CBD5E1' } }
drafts.getRange('A6:E6').format.fill = '#EFF6FF'
drafts.getRange('A8:E8').format.fill = '#EFF6FF'
const draftWidths = [22, 28, 46, 105, 42]
draftWidths.forEach((width, index) => { drafts.getRangeByIndexes(0, index, 9, 1).format.columnWidth = width })
drafts.getRange('5:5').format.rowHeight = 30
drafts.getRange('6:9').format.rowHeight = 190
drafts.freezePanes.freezeRows(5)
drafts.tables.add('A5:E9', true, 'OutreachDrafts')

workbook.recalculate()
const inspection = await workbook.inspect({ kind: 'table', range: '外链机会!A2:N12', include: 'values,formulas', tableMaxRows: 12, tableMaxCols: 14 })
console.log(inspection.ndjson)
const errors = await workbook.inspect({ kind: 'match', searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!', options: { useRegex: true, maxResults: 100 }, summary: 'final formula error scan' })
console.log(errors.ndjson)
const preview = await workbook.render({ sheetName: '外链机会', range: 'A1:N18', scale: 1, format: 'png' })
await fs.writeFile(`${outputDir}preview.png`, new Uint8Array(await preview.arrayBuffer()))
const draftsPreview = await workbook.render({ sheetName: '联系草稿', range: 'A1:E9', scale: 1, format: 'png' })
await fs.writeFile(`${outputDir}drafts-preview.png`, new Uint8Array(await draftsPreview.arrayBuffer()))
const output = await SpreadsheetFile.exportXlsx(workbook)
await output.save(`${outputDir}POKOPIE-外链机会跟进表.xlsx`)
