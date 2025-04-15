let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (command == '9') {
    // Puedes cambiar este URL por uno real de YouTube si quieres
    const video = { url: 'https://youtube.com/watch?v=dQw4w9WgXcQ' }

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
                  copy_code: `.ytmp3 ${video.url}`
                })
              },
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "Descargar video! 📹",
                  copy_code: `.ytmp4 ${video.url}`
                })
              }
            ],
            messageParamsJson: JSON.stringify({
              text: `Elige una opción para descargar el contenido:\n\n${video.url}`,
              footer: "Presiona un botón para copiar el comando"
            })
          }
        }
      }
    }, { messageId: generateMessageID() });

    return;
  }

  // Otro comportamiento aquí si quieres
};

const generateMessageID = () => Math.random().toString(36).substring(2, 10).toUpperCase();

handler.tags = ['tools'];
handler.help = ['9'];
handler.command = ['9'];

export default handler;