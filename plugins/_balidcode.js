// créditos a https://github.com/deylinqff

import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    return conn.sendMessage(m.chat, { text: '*✍️ Ingresa un texto para generar la imagen.*' }, { quoted: m });
  }

  try {
    // Generar imagen con IA
    const res = await fetch(`https://api.akuari.my.id/ai/text2img?text=${encodeURIComponent(text)}`);
    const json = await res.json();
    const buffer = await fetch(json.result).then(res => res.buffer());

    // Simulamos un video.url basado en texto
    const url = 'https://youtube.com/watch?v=dQw4w9WgXcQ';

    await conn.relayMessage(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {},
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "Descargar audio! 🎧",
                  copy_code: `.ytmp3 ${url}`
                })
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "Descargar video! 📹",
                  copy_code: `.ytmp4 ${url}`
                })
              }
            ],
            messageParamsJson: JSON.stringify({
              text: 'Imagen generada con éxito. Elige una opción:',
              footer: '¡Disfruta!'
            })
          }
        }
      }
    }, { messageId: generateMessageID() });

    // Enviar la imagen aparte (opcional)
    await conn.sendFile(m.chat, buffer, 'iaimg.jpg', `✅ Imagen generada para:\n\n*${text}*`, m);
  } catch (e) {
    console.error(e)
    await conn.sendMessage(m.chat, { text: '*🚨 Ha ocurrido un error 😔*' }, { quoted: m });
  }
};

const generateMessageID = () => Math.random().toString(36).substring(2, 10).toUpperCase();

handler.tags = ['tools'];
handler.help = ['iaimg <texto>'];
handler.command = ['iaimg', 'imgg', 'imgia'];

export default handler;