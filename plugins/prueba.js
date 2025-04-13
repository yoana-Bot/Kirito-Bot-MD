const WAMessageStubType = (await import('@whiskeysockets/baileys')).default;

export async function before(m, { conn }) {
  // Asegurarse que sea un grupo y tenga tipo de mensaje de sistema
  if (!m.isGroup || m.messageStubType !== WAMessageStubType.GROUP_CHANGE_DESCRIPTION) return;

  const dbChat = global.db.data.chats[m.chat];
  if (!dbChat || !dbChat.detect) return;

  const sender = `@${m.sender.split('@')[0]}`;
  const newDescription = m.messageStubParameters[0];

  const messageText = `*${sender}*\n【⚔】 Ha cambiado la descripción del grupo:\n\n${newDescription}`;

  await conn.sendMessage(
    m.chat,
    {
      text: messageText,
      mentions: [m.sender]
    }
  );
}