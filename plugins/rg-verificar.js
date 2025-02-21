import db from '../lib/database.js'
import fs from 'fs'
import PhoneNumber from 'awesome-phonenumber'
import { createHash } from 'crypto'  
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
  let mentionedJid = [who]
  let pp = await conn.profilePictureUrl(who, 'image').catch(() => 'https://qu.ax/JbNrT.jpg')
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  if (user.registered) return m.reply(`🚀 *Ya estás registrado.*\n\nSi deseas volver a registrarte, usa:\n*${usedPrefix}unreg*`)

  if (!Reg.test(text)) return m.reply(`⚠️ *Formato incorrecto.*\n\n💡 *Uso correcto:* *${usedPrefix + command} nombre.edad*\n📌 *Ejemplo:* *${usedPrefix + command} ${name2}.18*`)

  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return m.reply(`❌ *El nombre no puede estar vacío.*`)
  if (!age) return m.reply(`❌ *La edad no puede estar vacía.*`)
  if (name.length >= 100) return m.reply(`⚠️ *El nombre es demasiado largo.*`)

  age = parseInt(age)
  if (age > 1000) return m.reply(`🦴 *¡Un abuelo legendario quiere jugar!*`)
  if (age < 5) return m.reply(`🍼 *¿Un bebé registrándose?*`)

  user.name = name + ' ✓'
  user.age = age
  user.regTime = + new Date      
  user.registered = true
  global.db.data.users[m.sender].coin += 40
  global.db.data.users[m.sender].exp += 300
  global.db.data.users[m.sender].joincount += 20

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

  let regbot = `╔══════════════════╗\n`
  regbot += `║  👑 *REGISTRO COMPLETADO*  \n`
  regbot += `╚══════════════════╝\n\n`
  regbot += `╭───[ 📌 *Información* ]───╮\n`
  regbot += `│ 👤 *Nombre:* ${name}\n`
  regbot += `│ 🎂 *Edad:* ${age} años\n`
  regbot += `│ 🆔 *ID:* ${sn}\n`
  regbot += `╰───────────────────╯\n\n`
  regbot += `╭───[ 🎁 *Recompensas* ]───╮\n`
  regbot += `│ 💰 *Monedas:* 40\n`
  regbot += `│ ⭐ *Experiencia:* 300\n`
  regbot += `│ 🎟 *Tokens:* 20\n`
  regbot += `╰───────────────────╯\n\n`
  regbot += `✨ *¡Bienvenido al sistema!* ✨`

  await m.react('📩')

  await conn.sendMessage(m.chat, {
        text: regbot,
        contextInfo: {
            externalAdReply: {
                title: '🚀 Registro Exitoso',
                body: 'Tu cuenta ha sido verificada correctamente',
                thumbnailUrl: pp,
                sourceUrl: channel,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m })    
}; 

buttons: [  
    {  
      buttonId: '.menu',  
      buttonText: { displayText: '🔥 MENU' },  
    },  
  ],

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler