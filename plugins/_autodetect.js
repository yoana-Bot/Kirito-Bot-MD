const WAMessageStubType = (await import('@whiskeysockets/baileys')).default;

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return;

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
  };

  const dbChat = global.db.data.chats[m.chat];
  const kiritoUser = `@${m.sender.split('@')[0]}`;
  const pp = await conn.profilePictureUrl(m.chat, 'image').catch(() => null) || 'https://files.catbox.moe/xr2m6u.jpg';

  const messages = {
    nameChange: `*${kiritoUser}*\n【⚔】 Ha renombrado el grupo.\n\n【⚔】 Nuevo nombre:\n*<${m.messageStubParameters[0]}>*`,
    photoChange: `*${kiritoUser}*\n【⚔】 Ha actualizado la imagen del grupo.`,
    configChange: `*${kiritoUser}*\n【⚔】 Ahora solo ${m.messageStubParameters[0] === 'on' ? '*admins*' : '*todos*'} pueden editar la configuración del grupo.`,
    newLink: `【⚔】 El enlace del grupo ha sido regenerado por:\n*» ${kiritoUser}*`,
    groupStatus: `【⚔】 El grupo ha sido ${m.messageStubParameters[0] === 'on' ? '*cerrado 🔒*' : '*abierto 🔓*'} por *${kiritoUser}*\n\n【⚔】 Ahora ${m.messageStubParameters[0] === 'on' ? '*solo admins*' : '*todos*'} pueden enviar mensajes.`,
    adminAdded: `*@${m.messageStubParameters[0].split('@')[0]}* ha sido ascendido a *admin* 【⚔】\n\n【⚔】 Acción de:\n*» ${kiritoUser}*`,
    adminRemoved: `*@${m.messageStubParameters[0].split('@')[0]}* ha sido removido de *admin* 【⚔】\n\n【⚔】 Acción de:\n*» ${kiritoUser}*`,
  };

  switch (m.messageStubType) {
    case 21: // Nombre cambiado
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, { text: messages.nameChange, mentions: [m.sender] }, { quoted: kiritoContact });
      }
      break;

    case 22: // Foto cambiada
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, { image: { url: pp }, caption: messages.photoChange, mentions: [m.sender] }, { quoted: kiritoContact });
      }
      break;

    case 23: // Enlace cambiado
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, { text: messages.newLink, mentions: [m.sender] }, { quoted: kiritoContact });
      }
      break;

    case 25: // Configuración del grupo (solo admins pueden cambiar info)
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, { text: messages.configChange, mentions: [m.sender] }, { quoted: kiritoContact });
      }
      break;

    case 26: // Grupo cerrado/abierto
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, { text: messages.groupStatus, mentions: [m.sender] }, { quoted: kiritoContact });
      }
      break;

    case 29: // Agregado admin
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, { text: messages.adminAdded, mentions: [m.sender, m.messageStubParameters[0]] }, { quoted: kiritoContact });
      }
      break;

    case 30: // Removido admin
      if (dbChat.detect) {
        await conn.sendMessage(m.chat, { text: messages.adminRemoved, mentions: [m.sender, m.messageStubParameters[0]] }, { quoted: kiritoContact });
      }
      break;

    default:
      // Puedes habilitar esto para debug:
      // console.log({
      //   messageStubType: m.messageStubType,
      //   messageStubParameters: m.messageStubParameters,
      //   type: WAMessageStubType[m.messageStubType]
      // });
      break;
  }
}