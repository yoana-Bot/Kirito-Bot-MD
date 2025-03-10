import db from '../lib/database.js'
import fs from 'fs'
import { createHash } from 'crypto'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  if (!m.sender) return m.reply('Error: No se pudo identificar al usuario.')

  let who = (m.mentionedJid && m.mentionedJid[0]) 
    ? String(m.mentionedJid[0]) 
    : (m.fromMe && conn.user?.id) 
      ? String(conn.user.id) 
      : String(m.sender)

  // Asegurarse de que el JID tenga el formato correcto
  if (!who.includes('@s.whatsapp.net')) who += '@s.whatsapp.net'

  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://files.catbox.moe/xr2m6u.jpg')
  let user = global.db.data.users[m.sender] || {}
  let name2 = conn.getName(m.sender) || 'Usuario'

  if (user.registered) return m.reply(`『✦』Ya estás registrado.\n\n*¿Quieres volver a registrarte?*\n\nUsa *${usedPrefix}unreg*`, m)

  if (!Reg.test(text)) return m.reply(`『✦』Formato incorrecto.\n\nUso: *${usedPrefix + command} nombre.edad*\nEjemplo: *${usedPrefix + command} ${name2}.18*`, m)

  let [_, name, _, age] = text.match(Reg)
  if (!name) return m.reply(`『✦』El nombre no puede estar vacío.`, m)
  if (!age) return m.reply(`『✦』La edad no puede estar vacía.`, m)
  if (name.length >= 100) return m.reply(`『✦』El nombre es demasiado largo.`, m)

  age = parseInt(age)
  if (age > 1000) return m.reply(`『✦』Wow, el abuelo quiere jugar con el bot.`, m)
  if (age < 5) return m.reply(`『✦』Hay un abuelo bebé jsjsj.`, m)

  user.name = name + '✓'
  user.age = age
  user.regTime = Date.now()
  user.registered = true
  user.coin = (user.coin || 0) + 40
  user.exp = (user.exp || 0) + 300
  user.joincount = (user.joincount || 0) + 20

  let regbot = `✦ 𝗥 𝗘 𝗚 𝗜 𝗦 𝗧 𝗥 𝗔 𝗗 𝗢 ✦\n`
  regbot += `•──────────────────•\n`
  regbot += `> ᰔᩚ Nombre » ${name}\n`
  regbot += `> ✎ Edad » ${age} años\n`
  regbot += `•──────────────────•\n`
  regbot += `❀ 𝗥𝗲𝗰𝗼𝗺𝗽𝗲𝗻𝘀𝗮𝘀:\n`
  regbot += `> • ⛁ Monedas » 40\n`
  regbot += `> • ✰ Experiencia » 300\n`
  regbot += `> • ❖ Tokens » 20\n`
  regbot += `•──────────────────•\n`
  regbot += `> ${global.dev || ''}`

  await m.react('📩')

  if (!m.chat) return m.reply('Error: No se pudo identificar el chat.')

  await conn.sendMessage(String(m.chat), {
    text: regbot,
    mentions: [who], // Se usa mentions correctamente
    contextInfo: {
      externalAdReply: {
        title: '✧ Usuario Verificado ✧',
        body: global.textbot || '',
        thumbnailUrl: pp,
        sourceUrl: global.channel || '',
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler