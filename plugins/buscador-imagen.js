import { googleImage } from '@bochilteam/scraper';

const handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) return conn.reply(m.chat, `🔥 Por favor, ingresa un término de búsqueda.`, m);
  
  await m.react('⏳');
  conn.reply(m.chat, '👑 Descargando imágenes, espere un momento...', m);

  const res = await googleImage(text);
  const resultados = res.slice(0, 4); // Tomamos las 4 primeras imágenes

  const mensajes = resultados.map((img, index) => [
    `Imagen ${index + 1}`,
    `Resultado de búsqueda`,
    img,
    [], [], [], []
  ]);

  await conn.sendCarousel(m.chat, `🔍 Resultados para: ${text}`, '⪛✰ Imagen - Búsqueda ✰⪜', null, mensajes, m);
};

handler.help = ['imagen'];
handler.tags = ['buscador', 'tools', 'descargas'];
handler.command = ['image', 'imagen'];
handler.register = true;

export default handler;