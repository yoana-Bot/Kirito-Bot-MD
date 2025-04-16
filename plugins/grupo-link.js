const handler = async (m, { conn, participants, groupMetadata }) => {
  try {
    const group = m.chat;
    const link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group);
    const mensaje = `\t\t☆ 𝐂𝐨𝐦𝐩𝐚𝐫𝐭𝐞 ☆\n𝗚𝗿𝗨𝗽𝗢: ${groupMetadata.subject}\n\n${link}`;
    
    await conn.reply(m.chat, mensaje, m, { detectLink: true });
  } catch (e) {
    console.error(e);
    m.reply('❌ Ocurrió un error al obtener el enlace del grupo.');
  }
};

handler.help = ['link'];
handler.tags = ['grupo'];
handler.command = ['link', 'enlace'];
handler.group = true;
handler.botAdmin = true;

export default handler;