// Créditos del código a FzTeis

import axios from 'axios';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(conn, jid, medias, options = {}) {
  if (typeof jid !== "string") {
    throw new TypeError(`jid debe ser un string`);
  }

  if (medias.length < 2) {
    throw new RangeError("Se requieren al menos 2 medios para crear un álbum.");
  }

  const caption = options.caption || "";
  const delay = !isNaN(options.delay) ? options.delay : 500;

  const album = baileys.generateWAMessageFromContent(
    jid,
    {
      messageContextInfo: {},
      albumMessage: {
        expectedImageCount: medias.filter(m => m.type === "image").length,
        expectedVideoCount: medias.filter(m => m.type === "video").length,
        ...(options.quoted ? {
          contextInfo: {
            remoteJid: options.quoted.key.remoteJid,
            fromMe: options.quoted.key.fromMe,
            stanzaId: options.quoted.key.id,
            participant: options.quoted.key.participant || options.quoted.key.remoteJid,
            quotedMessage: options.quoted.message,
          },
        } : {})
      },
    },
    {}
  );

  await conn.relayMessage(jid, album.message, { messageId: album.key.id });

  for (let i = 0; i < medias.length; i++) {
    const { type, data } = medias[i];
    const msg = await baileys.generateWAMessage(
      jid,
      { [type]: data, ...(i === 0 ? { caption } : {}) },
      { upload: conn.waUploadToServer }
    );
    msg.message.messageContextInfo = {
      messageAssociation: {
        associationType: 1,
        parentMessageKey: album.key,
      },
    };
    await conn.relayMessage(jid, msg.message, { messageId: msg.key.id });
    await baileys.delay(delay);
  }

  return album;
}

const pins = async (query) => {
  const link = `https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}%26rs%3Dtyped&data=...`;

  const headers = {
    'user-agent': 'Mozilla/5.0',
    'x-requested-with': 'XMLHttpRequest',
    'referer': 'https://id.pinterest.com/',
  };

  try {
    const res = await axios.get(link, { headers });
    const results = res.data?.resource_response?.data?.results;
    if (!results) return [];

    return results.map(item => {
      if (item.images) {
        return {
          image_large_url: item.images.orig?.url,
          image_medium_url: item.images['564x']?.url,
          image_small_url: item.images['236x']?.url,
        };
      }
      return null;
    }).filter(Boolean);
  } catch (error) {
    console.error('Pinterest Error:', error.message);
    return [];
  }
};

let handler = async (m, { conn, text, command }) => {
  if (!text) {
    return conn.reply(m.chat, `Por favor, escribe una palabra clave. Ejemplo: *.${command} anime*`, m);
  }

  try {
    await conn.sendMessage(m.chat, { react: { text: '🕒', key: m.key } });

    const results = await pins(text);
    if (!results.length) {
      return conn.reply(m.chat, `No se encontraron resultados para *${text}*.`, m);
    }

    const maxImages = Math.min(results.length, 10);
    const medias = [];

    for (let i = 0; i < maxImages; i++) {
      medias.push({
        type: 'image',
        data: {
          url: results[i].image_large_url || results[i].image_medium_url || results[i].image_small_url
        }
      });
    }

    await sendAlbumMessage(conn, m.chat, medias, {
      caption: `Resultados para: *${text}*`,
      quoted: m
    });

    await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

  } catch (err) {
    console.error('Pinterest Handler Error:', err);
    conn.reply(m.chat, 'Ocurrió un error al obtener imágenes desde Pinterest.', m);
  }
};

handler.help = ['pinterest <texto>'];
handler.command = ['pinterest', 'pin'];
handler.tags = ['buscador'];

export default handler;