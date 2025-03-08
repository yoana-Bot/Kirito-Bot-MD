const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { 
    text: 'Uso correcto del comando:', m, fake);
    buttons: [
      {
        buttonId: 'servicios',
        buttonText: { displayText: '#serbot --code' },
      },
      {
        buttonId: 'contacto',
        buttonText: { displayText: '#serbot' },
      },
       ],
    footer: '¡KIRITO-BOT-MD!',
    viewOnce: true,
  }, { quoted: m });
};

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['code','Code'];

export default handler;