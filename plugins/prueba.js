// Creado por Deylin, no quites créditos.

const handler = async (m, { conn, fake }) => {
  await conn.sendMessage(m.chat, { 
    text: '⚠︎ *El comando se encuentra temporalmente fuera de servicio debido a un exceso de solicitudes. Por favor, inténtalo nuevamente más tarde.*',
    viewOnce: true,
  }, { quoted: m, fake });
};

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['play', 'play2'];

export default handler;