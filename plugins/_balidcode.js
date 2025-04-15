// créditos a https://github.com/deylinqff

import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.sendMessage(m.chat, { 
      image: buffer, 
      caption: 'Imagen generada con éxito. Elige una opción:',
                      buttons: [
                    {
                "name": "cta_copy",
                "buttonParamsJson": JSON.stringify({
                "display_text": "Descargar audio! 🎧",
                "copy_code": `.ytmp3 ${texto}`
                })
              },{
                "name": "cta_copy",
                "buttonParamsJson": JSON.stringify({
                "display_text": "Descargar video! 📹",
                "copy_code": `.ytmp4 ${video.url}`
                })
              }
                ],
      footer: '¡Disfruta!',
      viewOnce: true,
    }, { quoted: m });
  } catch (e) {
    await conn.sendMessage(m.chat, { text: '*🚨 Ha ocurrido un error 😔*' }, { quoted: m });
  }
};

handler.tags = ['tools'];
handler.help = ['genearimg'];
handler.command = ['iaimg', 'imgg', 'imgia'];

export default handler;