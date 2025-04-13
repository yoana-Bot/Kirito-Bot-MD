import axios from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys")).default;

const pins = async (query) => {
  const link = `https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(query)}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22query%22%3A%22${encodeURIComponent(query)}%22%2C%22scope%22%3A%22pins%22%2C%22rs%22%3A%22typed%22%7D%2C%22context%22%3A%7B%7D%7D`;

  const headers = {
    'accept': 'application/json, text/javascript, */*; q=0.01',
    'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
    'referer': 'https://id.pinterest.com/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36',
    'x-requested-with': 'XMLHttpRequest'
  };

  try {
    const res = await axios.get(link, { headers });
    const results = res.data?.resource_response?.data?.results || [];

    return results
      .map(item => item.images?.orig?.url)
      .filter(Boolean);
  } catch (e) {
    console.error('Pinterest API Error:', e);
    return [];
  }
};

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '⚠️ Ingresa lo que deseas buscar.', m);
  await m.react('🕒');
  conn.reply(m.chat, '🔍 Buscando imágenes en Pinterest...', m);

  const urls = await pins(text);
  if (!urls.length) return conn.reply(m.chat, '❌ No se encontraron resultados.', m);

  const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const selected = shuffle(urls).slice(0, 5);
  const cards = [];

  for (let i = 0; i < selected.length; i++) {
    const img = await generateWAMessageContent({
      image: { url: selected[i] }
    }, { upload: conn.waUploadToServer });

    cards.push({
      body: proto.Message.InteractiveMessage.Body.fromObject({ text: `Imagen - ${i + 1}` }),
      footer: proto.Message.InteractiveMessage.Footer.fromObject({ text: "Kirito-Bot IA" }),
      header: proto.Message.InteractiveMessage.Header.fromObject({
        title: '',
        hasMediaAttachment: true,
        imageMessage: img.imageMessage
      }),
      nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        buttons: [{
          name: "cta_url",
          buttonParamsJson: JSON.stringify({
            display_text: "Ver en Pinterest",
            Url: `https://www.pinterest.com/search/pins/?rs=typed&q=${encodeURIComponent(text)}`,
            merchant_url: `https://www.pinterest.com/search/pins/?rs=typed&q=${encodeURIComponent(text)}`
          })
        }]
      })
    });
  }

  const interactive = generateWAMessageFromContent(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: { deviceListMetadata: {}, deviceListMetadataVersion: 2 },
        interactiveMessage: proto.Message.InteractiveMessage.fromObject({
          body: { text: `🖼 Resultados de: ${text}` },
          footer: { text: "Pinterest - Kirito-Bot" },
          header: { hasMediaAttachment: false },
          carouselMessage: { cards }
        })
      }
    }
  }, { quoted: m });

  await m.react('✅');
  await conn.relayMessage(m.chat, interactive.message, { messageId: interactive.key.id });
};

handler.help = ["pinterest"];
handler.tags = ["descargas"];
handler.command = ['pinterest', 'pin'];
handler.group = true;
handler.register = true;

export default handler;