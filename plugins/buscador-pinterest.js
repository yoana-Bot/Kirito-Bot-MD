import axios from 'axios';
import baileys from '@whiskeysockets/baileys';
const { proto, generateWAMessageContent, generateWAMessageFromContent } = baileys.default;

async function crearImagenInteractiva(url, conn) {
  const { imageMessage } = await generateWAMessageContent({
    image: { url }
  }, { upload: conn.waUploadToServer });
  return imageMessage;
}

function barajar(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

const pins = async (query) => {
  const encoded = encodeURIComponent(query);
  const url = `https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encoded}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22query%22%3A%22${encoded}%22%2C%22scope%22%3A%22pins%22%7D%2C%22context%22%3A%7B%7D%7D`;
  const headers = { 'x-requested-with': 'XMLHttpRequest' };

  try {
    const res = await axios.get(url, { headers });
    return res.data.resource_response.data.results.map(r => r.images?.orig?.url).filter(Boolean);
  } catch (e) {
    return [];
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) return m.reply('🍫 Ingresa un texto. Ejemplo: .pinterest anime');

  m.react('🕒');
  const resultados = await pins(text);
  if (!resultados.length) return conn.reply(m.chat, `No se encontraron resultados para "${text}".`, m);

  barajar(resultados);
  const imagenes = resultados.slice(0, 5);
  const cards = [];

  for (let i = 0; i < imagenes.length; i++) {
    const img = await crearImagenInteractiva(imagenes[i], conn);
    cards.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({ text: `Imagen - ${i + 1}` }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "Pinterest Resultados" }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: '',
        hasMediaAttachment: true,
        imageMessage: img
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [{
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "Ver en Pinterest",
            url: `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(text)}`
          })
        }]
      })
    });
  }

  const carrusel = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {},
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: { text: `🔎 Resultados de búsqueda: "${text}"` },
          footer: { text: "⪛ Pinterest - Carrusel ⪜" },
          header: { hasMediaAttachment: false },
          carouselMessage: { cards }
        })
      }
    }
  }, { quoted: m });

  m.react('✅');
  await conn.relayMessage(m.chat, carrusel.message, { messageId: carrusel.key.id });
};

handler.help = ['pinterest'];
handler.command = ['pinterest', 'pin'];
handler.tags = ['buscador'];

export default handler;