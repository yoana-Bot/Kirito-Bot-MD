let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return

  let chat = global.db.data.chats[m.chat]
  if (!chat.detect) return

  const usuario = `@${m.sender.split`@`[0]}`
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'
  const ppUser = await conn.profilePictureUrl(m.sender).catch(_ => 'https://telegra.ph/file/9fa1c6c5f2c0c9411a4b2.jpg')

  const nombre = `*${usuario}*\n【✎】 Ha cambiado el nombre del grupo.\n\n【✎】 Ahora el grupo se llama:\n*<${m.messageStubParameters[0]}>*...`
  const foto = `*${usuario}*\n【⍰】 Ha cambiado la imagen del grupo...`
  const edit = `*${usuario}*\n【⌬】 Ha permitido que ${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'} puedan configurar el grupo...`
  const newlink = `【⌨】 El enlace del grupo ha sido restablecido por:\n*» ${usuario}*...`
  const status = `【⌬】 El grupo ha sido ${m.messageStubParameters[0] == 'on' ? '*cerrado 🔒*' : '*abierto 🔓*'} Por *${usuario}*\n\n⌬ Ahora ${m.messageStubParameters[0] == 'on' ? '*solo admins*' : '*todos*'} pueden enviar mensaje...`
  const admingp = `*@${m.messageStubParameters[0].split`@`[0]}* Ahora es admin del grupo 【☻】\n\n【⍰】 Acción hecha por:\n*» ${usuario}*...`
  const noadmingp = `*@${m.messageStubParameters[0].split`@`[0]}* Deja de ser admin del grupo 【☹】\n\n【⍰】 Acción hecha por:\n*» ${usuario}*...`

  // Crea el objeto contextInfo con el logo del usuario
  const contexto = {
    contextInfo: {
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: channelRD.id,
        serverMessageId: 100,
        newsletterName: channelRD.name,
      },
      externalAdReply: {
        showAdAttribution: true,
        title: textbot,
        body: '👑҉Kirito- Bot MDᚐ',
        mediaUrl: null,
        description: null,
        previewType: 'PHOTO',
        thumbnailUrl: ppUser,
        sourceUrl: redes,
        mediaType: 1,
        renderLargerThumbnail: false
      }
    }
  }

  // Envía el mensaje correspondiente según el tipo de cambio en el grupo
  switch (m.messageStubType) {
    case 21:
      await conn.sendMessage(m.chat, { text: nombre, mentions: [m.sender], ...contexto })
      break
    case 22:
      await conn.sendMessage(m.chat, { image: { url: pp }, caption: foto, mentions: [m.sender], ...contexto })
      break
    case 23:
      await conn.sendMessage(m.chat, { text: newlink, mentions: [m.sender], ...contexto })
      break
    case 25:
      await conn.sendMessage(m.chat, { text: edit, mentions: [m.sender], ...contexto })
      break
    case 26:
      await conn.sendMessage(m.chat, { text: status, mentions: [m.sender], ...contexto })
      break
    case 29:
      await conn.sendMessage(m.chat, { text: admingp, mentions: [m.sender, m.messageStubParameters[0]], ...contexto })
      break
    case 30:
      await conn.sendMessage(m.chat, { text: noadmingp, mentions: [m.sender, m.messageStubParameters[0]], ...contexto })
      break
    default:
      break
  }
}