import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'anime': 'ANIME',
  'main': 'INFO',
  'search': 'SEARCH',
  'game': 'GAME',
  'serbot': 'SUB BOTS',
  'rpg': 'RPG',
  'sticker': 'STICKER',
  'group': 'GROUPS',
  'nable': 'ON / OFF',
  'premium': 'PREMIUM',
  'downloader': 'DOWNLOAD',
  'tools': 'TOOLS',
  'fun': 'FUN',
  'nsfw': 'NSFW',
  'cmd': 'DATABASE',
  'owner': 'OWNER',
  'audio': 'AUDIOS',
  'advanced': 'ADVANCED',
  'weather': 'WEATHER',
  'news': 'NEWS',
  'finance': 'FINANCE',
  'education': 'EDUCATION',
  'health': 'HEALTH',
  'entertainment': 'ENTERTAINMENT',
  'sports': 'SPORTS',
  'travel': 'TRAVEL',
  'food': 'FOOD',
  'shopping': 'SHOPPING',
  'productivity': 'PRODUCTIVITY',
  'social': 'SOCIAL',
  'security': 'SECURITY',
  'custom': 'CUSTOM'
};

const defaultMenu = {
  before: `*⌬━━━━━▣━━◤⌬◢━━▣━━━━━━⌬*

Hola *%name* soy *kirito*

╔══════⌬『 𝑰𝑵𝑭𝑶-𝑼𝑺𝑬𝑹 』
║ ✎ Cliente: %name
║ ✎ Exp: %exp
║ ✎ Nivel: %level %levelprogress
╚══════ ♢.✰.♢ ══════

╔═══════⌬『 𝑰𝑵𝑭𝑶-𝑩𝑶𝑻 』
║ ✎ Bot: Kirito-Bot MD 
║ ✎ Modo: %mode
║ ✎ Tiempo Activo: %muptime
║ ✎ Usuarios: %totalreg 
╚══════ ♢.✰.♢ ══════

*◤━━━━━ ☆. ⌬ .☆ ━━━━━◥*
 %readmore
⚙_*𝑳𝑰𝑺𝑻𝑨 𝑫𝑬 𝑪𝑶𝑴𝑨𝑵𝑫𝑶𝑺*_
`.trimStart(),
  header: '*┏━━━━▣━━⌬〘 %category %emoji 〙*',
  body: '┃〘  %emoji %cmd %islimit %isPremium\n',
  footer: '*┗━━━▣━━⌬⌨⌬━━▣━━━━⌬*',
  after: `> © kirito-Bot by Deylin`,
}

let handler = async (m, { conn, usedPrefix: _p }) => {
  try {
    let name = await conn.getName(m.sender)
    let mode = global.opts["self"] ? "Privado" : "Público"

    if (!global.db.data.users[m.sender]) {
      global.db.data.users[m.sender] = { exp: 0, level: 1 }
    }

    let { exp, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let totalreg = Object.keys(global.db.data.users).length
    let muptime = clockString(process.uptime() * 1000)

    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
      help: Array.isArray(plugin.help) ? plugin.help : (plugin.help ? [plugin.help] : []),
      tags: Array.isArray(plugin.tags) ? plugin.tags : (plugin.tags ? [plugin.tags] : []),
      limit: plugin.limit,
      premium: plugin.premium,
    }));

    let menuText = [
      defaultMenu.before,
      ...Object.keys(tags).map(tag => {

        const commandsForTag = help.filter(menu => menu.tags.includes(tag));

        if (commandsForTag.length === 0) return ''; 

        return defaultMenu.header
          .replace(/%category/g, tags[tag])
          .replace(/%emoji/g, getRandomEmoji()) + '\n' + [
            ...commandsForTag.map(menu =>
              menu.help.map(help => defaultMenu.body
                .replace(/%emoji/g, getRandomEmoji()) 
                .replace(/%cmd/g, _p + help)
                .replace(/%islimit/g, menu.limit ? '◜⭐◞' : '')
                .replace(/%isPremium/g, menu.premium ? '◜🪪◞' : '')
                .trim()
              ).join('\n')
            ),
            defaultMenu.footer
          ].join('\n')
      }).filter(text => text !== ''), 
      defaultMenu.after
    ].join('\n')

    let replace = { 
      "%": "%", p: _p, mode, muptime, name, 
      exp: exp,
      level, 
      levelprogress: getLevelProgress(exp, min, max),
      maxexp: xp, 
      totalexp: exp, 
      xp4levelup: max - exp,
      totalreg, 
      readmore: readMore, 
    };

    let text = menuText.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])

    // Usamos las imágenes proporcionadas
    const imageUrls = ['https://files.catbox.moe/ngz0ng.jpg', 'https://files.catbox.moe/5olr3c.jpg', 'https://files.catbox.moe/9g3348.jpg', 'https://files.catbox.moe/91wohc.jpg']
    let selectedImage = imageUrls[Math.floor(Math.random() * imageUrls.length)]

    await m.react('🚀')
    await conn.sendMessage(m.chat, { 
      image: { url: selectedImage }, 
      caption: text.trim(), 
      mentions: [m.sender] 
    }, { quoted: m, fake })
  } catch (e) {
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
  }
}

handler.help = ['allmenu']
handler.tags = ['main']
handler.command = ['allmenu', 'menucompleto', 'menúcompleto', 'menú', 'menu', 'help'] 
handler.group = true;

export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = Math.floor(ms / 3600000)
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function getRandomEmoji() {
  const emojis = ['👑', '🔥', '🌟', '⚡']
  return emojis[Math.floor(Math.random() * emojis.length)]
}

function getLevelProgress(exp, min, max, length = 10) {
  if (exp < min) exp = min;
  if (exp > max) exp = max;
  let progress = Math.floor(((exp - min) / (max - min)) * length);
  progress = Math.max(0, Math.min(progress, length)); 
  let bar = '█'.repeat(progress) + '░'.repeat(length - progress);
  return `[${bar}]`;
}