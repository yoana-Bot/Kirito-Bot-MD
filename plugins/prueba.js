// Creado por Deylin, no quites créditos.

const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { 
    text: '⚠︎ *El comando se encuentra temporalmente fuera de servicio debido a un exceso de solicitudes. Por favor, inténtalo nuevamente más tarde...*', m, fake);
    viewOnce: true,
  }, { quoted: m });
};

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['play', 'play2'];

export default handler;