// Créditos Del Código A FzTeis

import axios from 'axios';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
  if (typeof jid !== "string") {
    throw new TypeError(`jid must be string, received: ${jid} (${jid?.constructor?.name})`);
  }

  if (medias.length < 2) {
    throw new RangeError("Minimum 2 media");
  }

  const caption = options.text || options.caption || "";
  const album = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.length,
      },
    },
    {}
  );

  // Enviar álbum vacío primero
  await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

  // Enviar imágenes en un solo mensaje
  const message = await baileys.generateWAMessage(
    album.key.remoteJid,
    {
      media: medias.map(media => ({
        type: media.type,
        data: media.data
      })),
      caption,
    },
    { upload: conn.waUploadToServer }
  );

  await conn.relayMessage(message.key.remoteJid, message.message, { messageId: message.key.id });

  return album;
}

const pins = async (query) => {
  const link = `https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22query%22%3A%22${encodeURIComponent(query)}%22%7D%2C%22context%22%3A%7B%7D%7D`;

  const headers = {
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
    'referer': 'https://id.pinterest.com/',
  };

  try {
    const res = await axios.get(link, { headers });
    if (res.data?.resource_response?.data?.results) {
      return res.data.resource_response.data.results
        .map(item => item.images?.orig?.url || null)
        .filter(url => url !== null);
    }
    return [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) {
    return m.reply(`🍫 Ingresa un texto. Ejemplo: .pinterest Crow`);
  }

  try {
    m.react('🕒');
    const results = await pins(text);
    if (!results.length) {
      return conn.reply(m.chat, `No se encontraron resultados para "${text}".`, m);
    }

    // Descargar imágenes antes de enviarlas
    const medias = await Promise.all(
      results.slice(0, 10).map(async (url) => {
        try {
          const response = await axios.get(url, { responseType: 'arraybuffer' });
          return { type: 'image', data: Buffer.from(response.data) };
        } catch (error) {
          console.error(`Error descargando imagen: ${url}`, error);
          return null;
        }
      })
    );

    // Filtrar imágenes fallidas
    const validMedias = medias.filter(media => media !== null);
    if (!validMedias.length) {
      return conn.reply(m.chat, `No se pudieron descargar imágenes de "${text}".`, m);
    }

    await sendAlbumMessage(m.chat, validMedias, {
      caption: `◜ Pinterest Search ◞\n≡ 🔎 Búsqueda: "${text}"\n≡ 📄 Resultados: ${validMedias.length}`,
      quoted: m
    });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (error) {
    console.error(error);
    conn.reply(m.chat, 'Error al obtener imágenes de Pinterest.', m);
  }
};

handler.help = ['pinterest'];
handler.command = ['pinterest', 'pin'];
handler.tags = ['buscador'];

export default handler;