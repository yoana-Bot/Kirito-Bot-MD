let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return

  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        displayName: "KIRITO-BOT",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Kirito;Bot;;;\nFN:Kirito Bot MD\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Usuario\nEND:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  }

  let chat = global.db.data.chats[m.chat]
  let usuario = `@${m.sender.split`@`[0]}`
  let pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'

  // Textos personalizados
  let nombre = `┏━༺ 𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭 𝐌𝐃 ༻━┓\n┃ ${usuario} ha cambiado el nombre del grupo.\n┃ Nuevo nombre:\n┗▶️ *${m.messageStubParameters[0]}*`
  let foto = {
    image: { url: pp },
    caption: `┏━༺ 𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭 𝐌𝐃 ༻━┓\n┃ ${usuario} ha cambiado la imagen del grupo\n┗▶️ *Uno de los mejores bots de WhatsApp!*`,
    mentions: [m.sender]
  }
  let edit = `┏━༺ 𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭 𝐌𝐃 ༻━┓\n┃ ${usuario} ha cambiado la configuración del grupo.\n┗▶️ Ahora *${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'}* pueden editar.`
  let newlink = `┏━༺ 𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭 𝐌𝐃 ༻━┓\n┃ ${usuario} ha restablecido el enlace del grupo.\n┗▶️ ¡Cuidado con compartirlo!`
  let status = `┏━༺ 𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭 𝐌𝐃 ༻━┓\n┃ El grupo ha sido *${m.messageStubParameters[0] == 'on' ? 'cerrado 🔒' : 'abierto 🔓'}* por ${usuario}\n┗▶️ Ahora *${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'}* pueden enviar mensajes.`
  let admingp = `┏━༺ 𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭 𝐌𝐃 ༻━┓\n┃ *@${m.messageStubParameters[0].split`@`[0]}* es ahora *admin* del grupo.\n┗▶️ Acción hecha por ${usuario}`
  let noadmingp = `┏━༺ 𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭 𝐌𝐃 ༻━┓\n┃ *@${m.messageStubParameters[0].split`@`[0]}* ha dejado de ser *admin*.\n┗▶️ Acción hecha por ${usuario}`

  if (chat.detect && m.messageStubType == 21) {
    await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 22) {
    await conn.sendMessage(m.chat, foto, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 23) {
    await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 25) {
    await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 26) {
    await conn.sendMessage(m.chat, { text: status, mentions: [m.sender] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 29) {
    await conn.sendMessage(m.chat, { text: admingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak })

  } else if (chat.detect && m.messageStubType == 30) {
    await conn.sendMessage(m.chat, { text: noadmingp, mentions: [`${m.sender}`, `${m.messageStubParameters[0]}`] }, { quoted: fkontak })

  } else {
    //console.log({
    // messageStubType: m.messageStubType,
    // messageStubParameters: m.messageStubParameters,
    // type: WAMessageStubType[m.messageStubType],
    //})
  }
}