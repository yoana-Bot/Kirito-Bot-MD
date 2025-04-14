import baileys from '@whiskeysockets/baileys';
import { readdirSync, unlinkSync, existsSync, promises as fs, rmSync } from 'fs';
import path from 'path';

const WAMessageStubType = baileys.WA_DEFAULT_EPHEMERAL;

export async function before(m, { conn, participants }) {
  if (!m.messageStubType || !m.isGroup) return;

  const kiritouser = `@${m.sender.split`@`[0]}`;
  const fkontak = {
    key: {
      participants: "0@s.whatsapp.net",
      remoteJid: "status@broadcast",
      fromMe: false,
      id: "Halo"
    },
    message: {
      contactMessage: {
        vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  };

  const chat = global.db.data.chats[m.chat];
  const users = participants.map(u => conn.decodeJid(u.id));
  const groupAdmins = participants.filter(p => p.admin);
  const listAdmin = groupAdmins.map((v, i) => `*» ${i + 1}. @${v.id.split('@')[0]}*`).join('\n');

  // Eliminar sesiones de PreKey
  if (chat.detect && m.messageStubType === 2) {
    const chatId = m.isGroup ? m.chat : m.sender;
    const uniqid = chatId.split('@')[0];
    const sessionPath = './Sessions/';
    const files = await fs.readdir(sessionPath);
    let filesDeleted = 0;

    for (const file of files) {
      if (file.includes(uniqid)) {
        await fs.unlink(path.join(sessionPath, file));
        filesDeleted++;
        console.log(`⚠️ Eliminación session (PreKey) que provocan el undefined en el chat`);
      }
    }
    return;
  }

  // Detectores de cambios de grupo
  if (!chat.detect) return;

  switch (m.messageStubType) {
    case 21:
      await conn.sendMessage(m.chat, {
        text: `${kiritouser} \`𝐇𝐀 𝐂𝐀𝐌𝐁𝐈𝐀𝐃𝐎 𝐄𝐋 𝐍𝐎𝐌𝐁𝐑𝐄 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎 𝐀:\`\n\n> *${m.messageStubParameters[0]}*`,
        mentions: [m.sender, ...groupAdmins.map(v => v.id)]
      }, { quoted: fkontak, ephemeralExpiration: 8640000, disappearingMessagesInChat: 8640000 });
      break;

    case 22:
      await conn.sendMessage(m.chat, {
        text: `${kiritouser} \`𝐂𝐀𝐌𝐁𝐈𝐎 𝐋𝐀 𝐅𝐎𝐓𝐎 𝐃𝐄𝐋 𝐆𝐑𝐔𝐏𝐎\``,
        mentions: [m.sender]
      }, { quoted: fkontak, ephemeralExpiration: 8640000, disappearingMessagesInChat: 8640000 });
      break;

    case 24:
      await conn.sendMessage(m.chat, {
        text: `${kiritouser} > 𝐍𝐔𝐄𝐕𝐀 𝐃𝐄𝐒𝐂𝐑𝐈𝐏𝐂𝐈𝐎́𝐍:\n\n${m.messageStubParameters[0]}`,
        mentions: [m.sender]
      }, { quoted: fkontak, ephemeralExpiration: 8640000, disappearingMessagesInChat: 8640000 });
      break;

    case 25:
      await conn.sendMessage(m.chat, {
        text: `📌 𝐀𝐇𝐎𝐑𝐀 *${m.messageStubParameters[0] === 'on' ? '𝐒𝐎𝐋𝐎 𝐀𝐃𝐌𝐈𝐍𝐒' : '𝐓𝐎𝐃𝐎𝐒'}* 𝐏𝐔𝐄𝐃𝐄𝐍 𝐄𝐃𝐈𝐓𝐀𝐑 𝐋𝐀 𝐈𝐍𝐅𝐎`,
        mentions: [m.sender]
      }, { quoted: fkontak, ephemeralExpiration: 8640000, disappearingMessagesInChat: 8640000 });
      break;

    case 26:
      await conn.sendMessage(m.chat, {
        text: `𝐆𝐑𝐔𝐏𝐎 *${m.messageStubParameters[0] === 'on' ? '𝐂𝐄𝐑𝐑𝐀𝐃𝐎 🔒' : '𝐀𝐁𝐈𝐄𝐑𝐓𝐎 🔓'}*\n${m.messageStubParameters[0] === 'on' ? '𝐒𝐎𝐋𝐎 𝐀𝐃𝐌𝐈𝐍𝐒 𝐏𝐔𝐄𝐃𝐄𝐍 𝐄𝐒𝐂𝐑𝐈𝐁𝐈𝐑' : '𝐘𝐀 𝐓𝐎𝐃𝐎𝐒 𝐏𝐔𝐄𝐃𝐄𝐍 𝐄𝐒𝐂𝐑𝐈𝐁𝐈𝐑'}\n> acción hecha por ${kiritouser}`,
        mentions: [m.sender]
      }, { quoted: fkontak, ephemeralExpiration: 8640000, disappearingMessagesInChat: 8640000 });
      break;

    case 29:
      await conn.sendMessage(m.chat, {
        text: `@${m.messageStubParameters[0].split`@`[0]} 𝐀𝐇𝐎𝐑𝐀 𝐓𝐈𝐄𝐍𝐄 𝐏𝐎𝐃𝐄𝐑𝐄𝐒 \n\n📌 𝐋𝐄 𝐎𝐓𝐎𝐑𝐆𝐎́ 𝐀𝐃𝐌𝐈𝐍 ${kiritouser}`,
        mentions: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)]
      }, { quoted: fkontak, ephemeralExpiration: 8640000, disappearingMessagesInChat: 8640000 });
      break;

    case 30:
      await conn.sendMessage(m.chat, {
        text: `@${m.messageStubParameters[0].split`@`[0]} 𝐘𝐀 𝐍𝐎 𝐓𝐈𝐄𝐍𝐄 𝐏𝐎𝐃𝐄𝐑𝐄𝐒\n\n📌 𝐋𝐄 𝐐𝐔𝐈𝐓𝐎 𝐀𝐃𝐌𝐈𝐍 ${kiritouser}`,
        mentions: [m.sender, m.messageStubParameters[0], ...groupAdmins.map(v => v.id)]
      }, { quoted: fkontak, ephemeralExpiration: 8640000, disappearingMessagesInChat: 8640000 });
      break;

    case 72:
      await conn.sendMessage(m.chat, {
        text: `${kiritouser} 𝐂𝐀𝐌𝐁𝐈𝐎 𝐋𝐀 𝐃𝐔𝐑𝐀𝐂𝐈𝐎́𝐍 𝐃𝐄 𝐋𝐎𝐒 𝐌𝐄𝐍𝐒𝐀𝐉𝐄𝐒 𝐓𝐄𝐌𝐏𝐎𝐑𝐀𝐋𝐄𝐒 𝐀 *@${m.messageStubParameters[0]}*`,
        mentions: [m.sender]
      }, { quoted: fkontak, ephemeralExpiration: 8640000, disappearingMessagesInChat: 8640000 });
      break;

    case 123:
      await conn.sendMessage(m.chat, {
        text: `${kiritouser} 𝐃𝐄𝐒𝐀𝐂𝐓𝐈𝐕𝐎 𝐋𝐎𝐒 𝐌𝐄𝐍𝐒𝐀𝐉𝐄𝐒 𝐓𝐄𝐌𝐏𝐎𝐑𝐀𝐋𝐄𝐒.`,
        mentions: [m.sender]
      }, { quoted: fkontak, ephemeralExpiration: 8640000, disappearingMessagesInChat: 8640000 });
      break;

    default:
      console.log({
        messageStubType: m.messageStubType,
        messageStubParameters: m.messageStubParameters,
        type: WAMessageStubType[m.messageStubType]
      });
  }
}