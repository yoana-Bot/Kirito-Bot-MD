const handler = async (m, { conn }) => {
  try {
    // Enviar el mensaje con el uso correcto del comando
    const texto = 'Uso correcto del comando: .serbot --code';

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

handler.tags = ['serbot'];
handler.help = ['serbot', 'serbot code'];
handler.command = ['code'];

export default handler;