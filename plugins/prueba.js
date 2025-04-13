const WAMessageStubType = (await import('@whiskeysockets/baileys')).default;

export async function before(m, { conn }) {
  // Asegurarse que sea un grupo y tenga tipo de mensaje de sistema
  if (!m.isGroup || m.messageStubType !== 24) return;

  const dbChat = global.db.data.chats[m.chat];
  if (!dbChat || !dbChat.detect) return;

  const sender = `@${m.sender.split('@')[0]}`;
  const newDescription = m.messageStubParameters[0];

  const contactMessage = {
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
FN:Kirito-Bot
TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}
END:VCARD`
      }
    },
    participant: "0@s.whatsapp.net"
  };

  const messageText = `*${sender}*\n【⚔】 Ha cambiado la descripción del grupo:\n\n${newDescription}`;

  await conn.sendMessage(
    m.chat,
    {
      text: messageText,
      mentions: [m.sender]
    },
    {
      quoted: contactMessage,
      ephemeralExpiration: 24 * 60 * 100,
      disappearingMessagesInChat: 24 * 60 * 100
    }
  );
}