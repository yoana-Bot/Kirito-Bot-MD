/** By @MoonContentCreator || https://github.com/MoonContentCreator/BixbyBot-Md **/
import fetch from 'node-fetch';

const handler = async (message, { conn, command, text, isAdmin }) => {
  // Rama para el comando "mute"
  if (command === 'mute') {
    if (!isAdmin) throw '👑 Solo un administrador puede ejecutar este comando';

    const ownerJid = global.owner[0][0] + '@s.whatsapp.net';
    if (message.sender[0] === ownerJid)
      throw '👑 El creador del bot no puede ser mutado';

    let target = message.sender[0]
      ? message.mentionedJid[0]
      : message.quoted
      ? message.quoted.sender
      : text;

    if (target === conn.user.jid)
      throw '🔥 No puedes mutar el bot';

    const groupMeta = await conn.groupMetadata(message.chat);
    const groupOwner = groupMeta.groupMetadata || message.chat.split('-')[0] + '@s.whatsapp.net';
    if (message.sender[0] === groupOwner)
      throw '🔥 No puedes mutar el creador del grupo';

    // Inicializa el usuario en la base de datos si no existe
    if (!global.db.data.users[target]) {
      global.db.data.users[target] = { muted: false };
    }
    let userData = global.db.data.users[target];

    if (userData.muted === true)
      throw '🍭 Este usuario ya ha sido mutado';

    const muteMessage = {
      key: {
        participants: '0@s.whatsapp.net',
        fromMe: false,
        id: 'Halo'
      },
      message: {
        locationMessage: {
          name: '𝗨𝘀𝘂𝗮𝗿𝗶𝗼 mutado',
          jpegThumbnail: await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
          vcard:
            'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
        }
      },
      participant: '0@s.whatsapp.net'
    };

    if (!message.sender[0] && !message.quoted)
      return conn.reply(message.chat, '🔥 Menciona a la persona que deseas demutar', message);

    conn.reply(message.chat, 'Tus mensajes serán eliminados', muteMessage, null, {
      mentions: [target]
    });
    global.db.data.users[target].muted = true;
  }
  // Rama para el comando "unmute"
  else if (command === 'unmute') {
    if (!isAdmin)
      throw '🔥 *Solo un administrador puede ejecutar este comando';

    let target = message.mentionedJid[0]
      ? message.mentionedJid[0]
      : message.quoted
      ? message.quoted.sender
      : text;

    // Inicializa el usuario en la base de datos si no existe
    if (!global.db.data.users[target]) {
      global.db.data.users[target] = { muted: false };
    }
    let userData = global.db.data.users[target];

    const unmuteMessage = {
      key: {
        participants: '0@s.whatsapp.net',
        fromMe: false,
        id: 'Halo'
      },
      message: {
        locationMessage: {
          name: '𝗨𝘀𝘂𝗮𝗿𝗶𝗼 demutado',
          jpegThumbnail: await (await fetch('https://telegra.ph/file/aea704d0b242b8c41bf15.png')).buffer(),
          vcard:
            'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
        }
      },
      participant: '0@s.whatsapp.net'
    };

    if (!message.mentionedJid[0] && !message.quoted)
      return conn.reply(message.chat, '🔥 Menciona a la persona que deseas demutar', message);

    if (userData.muted === false)
      throw '🔥 Este usuario no ha sido mutado';

    global.db.data.users[target].muted = false;
    conn.reply(message.chat, 'Tus mensajes no serán eliminados', unmuteMessage, null, {
      mentions: [target]
    });
  }
};

handler.command = ['mute', 'unmute'];
handler.admin = true;
handler.botAdmin = true;
export default handler;