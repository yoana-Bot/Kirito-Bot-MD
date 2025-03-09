import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'anime': '🧧 ANIME 🎐',
  'main': '❗ INFO ❕',
  'search': '🔎 SEARCH 🔍',
  'game': '🕹️ GAME 🎮',
  'serbot': '⚙️ SUB BOTS 🤖',
  'rpg': '🌐 RPG 🥇',
  'sticker': '💟 STICKER 🏷️',
  'group': '👥 GROUPS 📢',
  'nable': '🎛️ ON / OFF 🔌', 
  'premium': '💎 PREMIUM 👑',
  'downloader': '📥 DOWNLOAD 📤',
  'tools': '🔧 TOOLS 🛠️',
  'fun': '🎉 FUN 🎊',
  'nsfw': '🔞 NSFW 📛', 
  'cmd': '🧮 DATABASE 🖥️',
  'owner': '👤 OWNER 👁️', 
  'audio': '📣 AUDIOS 🔊', 
  'advanced': '🗝️ ADVANCED 🎮',
}

const emojisCategorias = {
  'anime': '🎴', 'main': '📌', 'search': '🔎', 'game': '🕹️',
  'serbot': '🤖', 'rpg': '⚔️', 'sticker': '🎭', 'group': '👥',
  'premium': '💎', 'downloader': '📥', 'tools': '🛠️', 'fun': '🎉',
  'nsfw': '🔞', 'cmd': '📂', 'owner': '👑', 'audio': '🎶', 'advanced': '🚀'
}

const defaultMenu = {
  before: `*⌬━━━━━▣━━◤⌬◢━━▣━━━━━━⌬*

Hola *%name* soy *kirito*

╔════⌬══◤𝑪𝑹𝑬𝑨𝑫𝑶𝑹◢
║  ♛ 𝑫𝒆𝒚𝒍𝒊𝒏
╚════⌬══◤✰✰✰✰✰◢

╔══════⌬『 𝑰𝑵𝑭𝑶-𝑩𝑶𝑻 』
║ ✎ Cliente: %name
║ ✎ Exp: %exp
║ ✎ Nivel: %level
╚══════ ♢.✰.♢ ══════

╔═══════⌬『 𝑰𝑵𝑭𝑶-𝑼𝑺𝑬𝑹 』
║ ✎ Bot: ©Tecno-Bot-Plus®
║ ✎ Modo: %mode
║ ✎ Tiempo Activo: %muptime
║ ✎ Usuarios: %totalreg 
╚══════ ♢.✰.♢ ══════

*◤━━━━━ ☆. ⌬ .☆ ━━━━━◥*
 %readmore
⚙_*𝑳𝑰𝑺𝑻𝑨 𝑫𝑬 𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺*_
`.trimStart(),
  header: '*┏━━━━▣━━⌬〘 %category %emoji 〙*',
  body: '┃✎›〘 %cmd %islimit %isPremium\n',
  footer: '*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*',
  after: `© Tecno-Bot-Plus`,
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let name = await conn.getName(m.sender)
    let mode = global.opts["self"] ? "Privado" : "Público"
    let { exp, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let totalreg = Object.keys(global.db.data.users).length
    let muptime = clockString(process.uptime() * 1000)
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
  help: Array.isArray(plugin.help) ? plugin.help : (plugin.help ? [plugin.help] : []),
  tags: Array.isArray(plugin.tags) ? plugin.tags : (plugin.tags ? [plugin.tags] : []),
  limit: plugin.limit || false,
  premium: plugin.premium || false,
}))

    let menuText = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag => {
        return defaultMenu.header.replace(/%category/g, tags[tag]).replace(/%emoji/g, emojisCategorias[tag]) + '\n' + [
          ...help.filter(menu => menu.tags.includes(tag)).map(menu =>
            menu.help.map(help => defaultMenu.body
              .replace(/%cmd/g, _p + help)
              .replace(/%islimit/g, menu.limit ? '◜⭐◞' : '')
              .replace(/%isPremium/g, menu.premium ? '◜🪪◞' : '')
              .trim()
            ).join('\n')
          ),
          defaultMenu.footer
        ].join('\n')
      }),
      defaultMenu.after
    ].join('\n')

    let replace = { "%": "%", p: _p, mode, muptime, name, exp: exp - min, maxexp: xp, totalexp: exp, xp4levelup: max - exp, totalreg, readmore: readMore }
    let text = menuText.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    let videoUrl = 'https://qu.ax/FBjYO.mp4'
    await m.react('🚀')
    await conn.sendMessage(m.chat, { video: { url: videoUrl }, gifPlayback: true, caption: text.trim(), mentions: [m.sender] }, { quoted: m })
  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['allmenu']
handler.tags = ['main']
handler.command = ['allmenu', 'menucompleto', 'menúcompleto', 'menú', 'menu'] 
handler.register = true 
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}