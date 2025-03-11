const handler = async (m, { conn, command, args }) => {
    await conn.sendMessage(m.chat, { 
      text: '⚠ *Si estás conectado a otra sesión de sub-bot, por favor te recomiendo que te desconectes o no te conectes a este bot. Si estás conectado a dos, tu cuenta podría ser baneada de WhatsApp y además podrían surgir problemas en el sistema del bot.*',
      buttons: [
        {
          buttonId: 'servicios',
          buttonText: { displayText: '#code' },
        },
        {
          buttonId: 'contacto',
          buttonText: { displayText: '#serbot' },
        },
      ],
      footer: '¡KIRITO-BOT-MD!',
      viewOnce: true,
    }, { quoted: m });
  } else {
    await conn.sendMessage(m.chat, { text: 'Debes incluir `--code` en el comando.' }, { quoted: m });
  }
};

handler.tags = ['tools'];
handler.help = ['fun'];
handler.command = ['cide', 'Code'];

export default handler;