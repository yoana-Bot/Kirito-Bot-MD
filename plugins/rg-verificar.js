import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
    let user = global.db.data.users[m.sender]
    let name2 = conn.getName(m.sender)
    let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/22mlg6.jpg')
    
    let bio = 0
    let biografia = await conn.fetchStatus(m.sender).catch(() => null)
    bio = biografia?.[0]?.status || '⚔️ Estado privado'

    if (user.registered) {
        return m.reply(`✦ Ya estás registrado, ${name2}.\n\nSi deseas registrarte nuevamente, usa:\n*${usedPrefix}unreg*`)
    }

    if (!Reg.test(text)) {
        throw `⚔️ *Formato incorrecto.*\n\nUsa: *${usedPrefix + command} Nombre.edad*\nEjemplo: *${usedPrefix + command} ${name2}.18*`
    }

    let [_, name, splitter, age] = text.match(Reg)
    if (!name) throw '⚔️ *Debes ingresar un nombre válido.*'
    if (!age) throw '⚔️ *Debes ingresar una edad válida.*'
    if (name.length >= 30) throw '⚔️ *El nombre no debe superar los 30 caracteres.*'
    
    age = parseInt(age)
    if (age > 10000) throw '👴 *¡Un guerrero inmortal se ha unido!*'
    if (age < 5) throw '🍼 *¡Un bebé espadachín ha llegado!*'

    user.name = name.trim() + ' ✓'
    user.age = age
    user.descripcion = bio
    user.regTime = +new Date
    user.registered = true

    global.db.data.users[m.sender].money += 600
    global.db.data.users[m.sender].dragones += 10
    global.db.data.users[m.sender].exp += 245
    global.db.data.users[m.sender].joincount += 5

    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20)

    let regbot = `⟡━━━『 *⚔️ Registro Exitoso* 』━━━⟡
🏷️ *Usuario:* ${name}
🎂 *Edad:* ${age} años
🛡️ *ID:* ${sn}
📜 *Biografía:* ${bio}
🎖️ *Recompensas:*
  ├ 💰 600 Monedas
  ├ 🔥 10 llamas 
  ├ ✨ 245 Exp
  ├ 🎟️ 5 Tokens
  └ ⚡ Estado: *Verificado*
⟡━━━━━━━━━━━━━━━━━━━━⟡`

    await conn.sendMessage(m.chat, { 
        image: { url: imagenFija },
        caption: regbot,
        buttons: [
            { buttonId: '.menu', buttonText: { displayText: '📜 Menú' }, type: 1 },
            { buttonId: '.profile', buttonText: { displayText: '🔰 Perfil' }, type: 1 }
        ],
        headerType: 4,
        footer: '⚔️ *Bienvenido a la batalla, guerrero.*'
    }, { quoted: m })
}

handler.help = ['reg']
handler.tags = ['rg']
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar']

export default handler