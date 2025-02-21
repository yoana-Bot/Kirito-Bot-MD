import db from '../lib/database.js'
import fs from 'fs'
import { createHash } from 'crypto'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
    let mentionedJid = [who]
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)
    
    if (user.registered) return m.reply(`「 ✦ 」Ya estás registrado.\n\n⚔️ *¿Quieres volver a registrarte?*\n\nUsa *${usedPrefix}unreg* para eliminar tu registro.`)

    if (!Reg.test(text)) return m.reply(`「 ✦ 」Formato incorrecto.\n\n🛡️ Uso: *${usedPrefix + command} nombre.edad*\n🔹 Ejemplo: *${usedPrefix + command} ${name2}.18*`)

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) return m.reply(`「 ✦ 」El nombre no puede estar vacío.`)
    if (!age) return m.reply(`「 ✦ 」La edad no puede estar vacía.`)
    if (name.length >= 100) return m.reply(`「 ✦ 」El nombre es demasiado largo.`)
    
    age = parseInt(age)
    if (age > 1000) return m.reply(`「 ✦ 」Wow, un anciano guerrero quiere jugar al bot.`)
    if (age < 5) return m.reply(`「 ✦ 」¡Un bebé espadachín se ha unido! ⚔️`)

    user.name = name + ' ✓'
    user.age = age
    user.regTime = +new Date
    user.registered = true
    global.db.data.users[m.sender].coin += 40
    global.db.data.users[m.sender].exp += 300
    global.db.data.users[m.sender].joincount += 20

    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

    let regbot = `┏━━━━━━━━━━━✦\n`
    regbot += `┃  ✧ 𝗞𝗜𝗥𝗜𝗧𝗢-𝗕𝗢𝗧 ✧\n`
    regbot += `┣━━━━━━━━━━━✦\n`
    regbot += `┃ ⚔️ *Usuario Registrado* ⚔️\n`
    regbot += `┃\n`
    regbot += `┃ 🏷️ *Nombre:* ${name}\n`
    regbot += `┃ 🎂 *Edad:* ${age} años\n`
    regbot += `┃ 🔰 *ID:* ${sn}\n`
    regbot += `┣━━━━━━━━━━━✦\n`
    regbot += `┃ 🎁 *Recompensas*\n`
    regbot += `┃ 💰 *Monedas:* 40\n`
    regbot += `┃ ⭐ *Exp:* 300\n`
    regbot += `┃ 🎟️ *Tokens:* 20\n`
    regbot += `┣━━━━━━━━━━━✦\n`
    regbot += `┃ 🔗 *${dev}*\n`
    regbot += `┗━━━━━━━━━━━✦\n`

    await m.react('📩')

    await conn.sendMessage(m.chat, {
        text: regbot,
        contextInfo: {
            externalAdReply: {
                title: '✧ Usuario Verificado ✧',
                body: textbot,
                thumbnailUrl: pp,
                sourceUrl: channel,
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