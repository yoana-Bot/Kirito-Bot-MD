const handler = async (m, { conn, isAdmin, groupMetadata }) => {
  if (isAdmin) return m.reply(`${emoji} Tu ya eres admin.`);
  try {
    await conn.groupParticipantsUpdate(m.chat, [m.sender], 'promote');
    await m.react(done);
    
    // Enviar mensaje con un botón
    const texto = `${emoji} Ya te di admin.`;

    const buttons = [
      {
        buttonId: '.help',
        buttonText: { displayText: '📚 Ayuda' },
      },
    ];

    await conn.sendMessage(m.chat, { 
      text: texto, 
      buttons: buttons, 
      footer: '¡Felicidades!' 
    }, { quoted: m });

  } catch {
    m.reply(`${msm} Ocurrio un error.`);
  }
};

handler.tags = ['owner'];
handler.help = ['autoadmin'];
handler.command = ['code'];
handler.rowner = true;
handler.group = true;
handler.botAdmin = true;

export default handler;