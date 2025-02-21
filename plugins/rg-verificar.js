import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)

  let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/22mlg6.jpg')
  let bio = 0, fechaBio
  let sinDefinir = '😿 Es privada'
  let biografia = await conn.fetchStatus(m.sender).catch(() => null)

  if (!biografia || !biografia[0] || biografia[0].status === null) {
    bio = sinDefinir
    fechaBio = "Fecha no disponible"
  } else {
    bio = biografia[0].status || sinDefinir
    fechaBio = biografia[0].setAt ? new Date(biografia[0].setAt).toLocaleDateString("es-ES", { day: "2-digit", month: "2-digit", year: "numeric", }) : "Fecha no disponible"
  }

  if (user.registered === true) {
    return m.reply(`✦ *YA ESTÁS REGISTRADO(A)*\n\n¿Deseas hacerlo de nuevo?\nUsa: *${usedPrefix}unreg*`)
  }

  if (!Reg.test(text)) throw `✦ *Uso incorrecto del comando*\n\nFormato: #reg *Nombre.edad*\nEjemplo: #reg *${name2}.18*`

  let [_, name, splitter, age] = text.match(Reg)
  if (!name) throw '✦ *El nombre es obligatorio.*'
  if (!age) throw '✦ *La edad es obligatoria.*'
  if (name.length >= 30) throw '✦ *El nombre no puede tener más de 30 caracteres.*' 

  age = parseInt(age)
  if (age > 10000) throw '😏 *Viejo/a Sabroso/a*'
  if (age < 5) throw '🍼 *Ven aquí, ¡te adoptaré!*'

  user.name = name.trim()
  user.age = age
  user.descripcion = bio
  user.regTime = + new Date
  user.registered = true

  global.db.data.users[m.sender].money += 600
  global.db.data.users[m.sender].dragones += 10
  global.db.data.users[m.sender].exp += 245
  global.db.data.users[m.sender].joincount += 5

  let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)        
  m.react('📩') 

  let regbot = `╭━━⟪ ✦ 𝗥𝗘𝗚𝗜𝗦𝗧𝗥𝗢 ✦ ⟫━━╮
┃ 👑 𝗡𝗼𝗺𝗯𝗿𝗲: *${name}*
┃ 📅 𝗘𝗱𝗮𝗱: *${age} años*
┃ 🌟 𝗕𝗶𝗼: *${bio}*
╰━━━━━━━━━━━━━╯
🎁 *𝗥𝗘𝗖𝗢𝗠𝗣𝗘𝗡𝗦𝗔𝗦*:
+ 💰 600 monedas
+ 🪙 10 Coins
+ ✨ 245 Exp
+ ⚜️ 12 Tokens

🔗 *Verifica tu registro aquí:*
${channel2}
`

  let botones = [
    {buttonId: `${usedPrefix}perfil`, buttonText: {displayText: '👤 Ver Perfil'}, type: 1},
    {buttonId: `${usedPrefix}balance`, buttonText: {displayText: '💰 Ver Monedas'}, type: 1},
    {buttonId: `${usedPrefix}menu`, buttonText: {displayText: '📜 Menú'}, type: 1}
  ]

  let buttonMessage = {
    image: { url: imagen1 },
    caption: regbot,
    footer: '✦ Kirito-Bot ✦',
    buttons: botones,
    headerType: 4
  }

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m })

  let chtxt = `
⟪ ✦ 𝗞𝗜𝗥𝗜𝗧𝗢-𝗕𝗢𝗧 ✦ ⟫
✦ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: ${m.pushName || 'Anónimo'}
✦ 𝗡𝗼𝗺𝗯𝗿𝗲: ${user.name}
✦ 𝗘𝗱𝗮𝗱: ${user.age} años
✦ 𝗕𝗶𝗼𝗴𝗿𝗮𝗳𝗶́𝗮: ${user.descripcion}
✦ 𝗙𝗲𝗰𝗵𝗮: ${fechaBio}
✦ 𝗥𝗲𝗴𝗶𝘀𝘁𝗿𝗼 𝗡°: ${sn}
  `.trim()

  await conn.sendMessage(global.idchannel, { text: chtxt, contextInfo: {
    externalAdReply: {
      title: "🔔 𝗡𝗢𝗧𝗜𝗙𝗜𝗖𝗔𝗖𝗜𝗢́𝗡 🔔",
      body: '🥳 ¡Un nuevo usuario en mi base de datos!',
      thumbnailUrl: perfil,
      sourceUrl: redes,
      mediaType: 1,
      showAdAttribution: false,
      renderLargerThumbnail: false
    }
  }}, { quoted: null })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'] 

export default handler