import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  if (user.registered === true) return m.reply(`✦ *YA ESTÁS REGISTRADO.*\n\n¿Quieres hacerlo de nuevo?\nUsa: *${usedPrefix}unreg*`)

  if (!Reg.test(text)) return m.reply(`✦ *Formato incorrecto.*\n\nUso: *${usedPrefix + command} Nombre.Edad*\nEjemplo: *${usedPrefix + command} ${name2}.18*`)

  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply(`✦ *El nombre es obligatorio.*`)
  if (!age) return m.reply(`✦ *La edad es obligatoria.*`)
  if (name.length >= 100) return m.reply(`✦ *El nombre no puede superar los 100 caracteres.*`)
  
  age = parseInt(age)
  if (age > 1000) return m.reply(`😏 *Wow, el abuelo quiere jugar al bot.*`)
  if (age < 5) return m.reply(`🍼 *Hay un abuelo bebé jsjsj.*`)

  user.name = name.trim()
  user.age = age
  user.regTime = + new Date      
  user.registered = true

  global.db.data.users[m.sender].coin += 40
  global.db.data.users[m.sender].exp += 300
  global.db.data.users[m.sender].joincount += 20

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  let regbot = `╭━━ ⪨ *𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗔𝗗𝗢* ⪩ ━━╮
┃ 👤 *𝗡𝗼𝗺𝗯𝗿𝗲:* ${name}
┃ 📅 *𝗘𝗱𝗮𝗱:* ${age} años
┃ 🔑 *𝗜𝗗:* ${sn}
╰━━━━━━━━━━━━━━━━━━╯
🎁 *𝗥𝗘𝗖𝗢𝗠𝗣𝗘𝗡𝗦𝗔𝗦*:
+ 💰 40 monedas
+ ✨ 300 Exp
+ ⚜️ 20 Tokens

🔗 *Verifica tu registro aquí:* ${channel}
  `

  let botones = [
    {buttonId: `${usedPrefix}perfil`, buttonText: {displayText: '👤 Ver Perfil'}, type: 1},
    {buttonId: `${usedPrefix}balance`, buttonText: {displayText: '💰 Ver Monedas'}, type: 1},
    {buttonId: `${usedPrefix}menu`, buttonText: {displayText: '📜 Menú'}, type: 1}
  ]

  let buttonMessage = {
    image: { url: pp },
    caption: regbot,
    footer: '✦ Kirito-Bot ✦',
    buttons: botones,
    headerType: 4
  }

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m })  
}; 

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler