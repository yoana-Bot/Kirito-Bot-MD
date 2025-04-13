const WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return

  // Mensaje base para respuestas con estilo Kirito-Bot
  const kiritoContact = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Kirito"
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD
VERSION:3.0
N:Kirito;Bot;;;
FN:Kirito-Bot
item1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}
item1.X-ABLabel:Celular
END:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  }

  // Datos del chat y del usuario
  const dbChat = global.db.data.chats[m.chat]
  const kiritoUser = `@${m.sender.split('@')[0]}`
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => null) || 'https://files.catbox.moe/xr2m6u.jpg'

  // Mensajes con estilo Kirito-Bot
  const messages = {
    nameChange: `*${kiritoUser}*\n【⚔】 Has re-escrito el nombre del grupo.\n\n【⚔】 Ahora se llama:\n*<${m.messageStubParameters[0]}>*...`,
    photoChange: `*${kiritoUser}*\n【⚔】 La imagen del grupo ha sido actualizada...`,
    configChange: `*${kiritoUser}*\n【⚔】 La configuración del grupo ahora es: ${m.messageStubParameters[0] === 'on' ? 'solo admins' : 'todos'}...`,
    newLink: `【⚔】 El enlace del grupo ha sido regenerado por:\n*» ${kiritoUser}*...`,
    groupStatus: `【⚔】 El grupo se ha puesto ${m.messageStubParameters[0] === 'on' ? '*cerrado 🔒*' : '*abierto 🔓*'}\n\n【⚔】 Permisos: ${m.messageStubParameters[0] === 'on' ? '*solo admins*' : '*todos*'}...`,
    adminAdded: `*@${m.messageStubParameters[0].split('@')[0]}* ahora ostenta el título de admin en el grupo 【⚔】\n\n【⚔】 Acción ejecutada por:\n*» ${kiritoUser}*...`,
descriptionChange: `*${kiritoUser}*\n【⚔】 Ha actualizado la descripción del grupo...\n\n【✒】 Nueva descripción:\n*"${m.messageStubParameters[0]}"*`,
    adminRemoved: `*@${m.messageStubParameters[0].split('@')[0]}* ha perdido el rango de admin en el grupo 【⚔】\n\n【⚔】 Acción ejecutada por:\n*» ${kiritoUser}*...`
  }

  // Manejo de mensajes según el tipo de stub recibido
  switch (m.messageStubType) {
    case 21:
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, 
          { text: messages.nameChange, mentions: [m.sender] },
          { quoted: kiritoContact }
        )
      }
      break

    case 22:
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, 
          { image: { url: pp }, caption: messages.photoChange, mentions: [m.sender] },
          { quoted: kiritoContact }
        )
      }
      break

    case 23:
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, 
          { text: messages.newLink, mentions: [m.sender] },
          { quoted: kiritoContact }
        )
      }
      break

    case 24:
      if (dbChat.detect) {
        await conn.sendMessage(m.chat,
          { text: messages.descriptionChange, mentions: [m.sender] },
          { quoted: kiritoContact }
        )
      }
      break

    case 25:
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, 
          { text: messages.configChange, mentions: [m.sender] },
          { quoted: kiritoContact }
        )
      }
      break

    case 26:
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, 
          { text: messages.groupStatus, mentions: [m.sender] },
          { quoted: kiritoContact }
        )
      }
      break

    case 29:
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, 
          { text: messages.adminAdded, mentions: [m.sender, m.messageStubParameters[0]] },
          { quoted: kiritoContact }
        )
      }
      break

    case 30:
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, 
          { text: messages.adminRemoved, mentions: [m.sender, m.messageStubParameters[0]] },
          { quoted: kiritoContact }
        )
      }
      break

    default:
      // Registro opcional para depuración
      // console.log({
      //   messageStubType: m.messageStubType,
      //   messageStubParameters: m.messageStubParameters,
      //   type: WAMessageStubType[m.messageStubType]
      // })
      break
  }
}