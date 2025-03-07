const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { 
    text: 'Elige una opción:',
    buttons: [
      {
        buttonId: '.web servicios',
        buttonText: { displayText: '🌐 Servicios' },
      },
      {
        buttonId: '.web contacto',
        buttonText: { displayText: '📞 Contacto' },
      },
      {
        buttonId: '.web plataforma',
        buttonText: { displayText: '💻 Plataforma' },
      },
    ],
    footer: '¡Con gusto te ayudaré!',
    viewOnce: true,
  }, { quoted: m });
};

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['web', 'servicios', 'info'];

export default handler;