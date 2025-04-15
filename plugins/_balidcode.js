// Creado por Deylin no quites creditos.


const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { 
    text: 'Uso correcto del comando:',
                    buttons: [
                    {
                "name": "cta_copy",
                "buttonParamsJson": JSON.stringify({
                "display_text": "Descargar audio! 🎧",
                "copy_code": `.ytmp3 ${video.url}`
                })
              },{
                "name": "cta_copy",
                "buttonParamsJson": JSON.stringify({
                "display_text": "Descargar video! 📹",
                "copy_code": `.ytmp4 ${video.url}`
                })
              }
                ],
    footer: '¡MITSURI - KANROJI - BOT!',
    viewOnce: true,
  }, { quoted: m });
};

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['code','Code'];

export default handler;