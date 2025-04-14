let WAMessageStubType = (await import('@whiskeysockets/baileys')).default

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return

  let chat = global.db.data.chats[m.chat]
  if (!chat.detect) return

  let usuario = `@${m.sender.split`@`[0]}`
  let ppgroup = await conn.profilePictureUrl(m.chat, 'image').catch(_ => null) || 'https://files.catbox.moe/xr2m6u.jpg'
  let ppuser = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/9fa1c6c5f2c0c9411a4b2.jpg')

  // Mensajes
  let nombre = `*${usuario}*\n【✎】 Ha cambiado el nombre del grupo.\n\n【✎】 Ahora el grupo se llama:\n*<${m.messageStubParameters[0]}>*...`
  let foto = `*${usuario}*\n【⍰】 Ha cambiado la imagen del grupo...`
  let edit = `*${usuario}*\n【⌬】 Ha permitido que ${m.messageStubParameters[0] == 'on' ? 'solo admins' : 'todos'} puedan configurar el grupo...`
  let newlink = `【⌨】 El enlace del grupo ha sido restablecido por:\n*» ${usuario}*...`
  let status = `【⌬】 El grupo ha sido ${m.messageStubParameters[0] == 'on' ? '*cerrado 🔒*' : '*abierto 🔓*'} Por *${usuario}*\n\n⌬ Ahora ${m.messageStubParameters[0] == 'on' ? '*solo admins*' : '*todos*'} pueden enviar mensaje...`
  let admingp = `*@${m.messageStubParameters[0].split`@`[0]}* Ahora es admin del grupo 【☻】\n\n【⍰】 Acción hecha por:\n*» ${usuario}*...`
  let noadmingp = `*@${m.messageStubParameters[0].split`@`[0]}* Deja de ser admin del grupo 【☹】\n\n【⍰】 Acción hecha por:\n*» ${usuario}*...`

  // Usar global.rcanale como contexto
  const quoted = {
    image: { url: ppuser },
    caption: '',
    mentions: [m.sender],
    contextInfo: global.rcanale.contextInfo
  }

  switch (m.messageStubType) {
    case 21:
      quoted.caption = nombre
      break
    case 22:
      quoted.image.url = ppgroup
      quoted.caption = foto
      break
    case 23:
      quoted.caption = newlink
      break
    case 25:
      quoted.caption = edit
      break
    case 26:
      quoted.caption = status
      break
    case 29:
      quoted.caption = admingp
      quoted.mentions.push(m.messageStubParameters[0])
      break
    case 30:
      quoted.caption = noadmingp
      quoted.mentions.push(m.messageStubParameters[0])
      break
    default:
      return
  }

  await conn.sendMessage(m.chat, quoted)
}