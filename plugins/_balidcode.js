let handler = async (m, { conn, usedPrefix, command, args }) => {
  // Si el comando es .9, responde con un botón para copiar el texto "👑👑👑👑👑"
  if (command == '9') {
    const texto = '👑👑👑👑👑'

    await conn.relayMessage(m.chat, {
      viewOnceMessage: {
        message: {
          messageContextInfo: {},
          nativeFlowMessage: {
            buttons: [
              {
                name: "cta_copy",
                buttonParamsJson: JSON.stringify({
                  display_text: "Copiar coronas!",
                  copy_code: texto
                })
              }
            ],
            messageParamsJson: JSON.stringify({
              text: `Aquí tienes tus coronas:\n\n${texto}`,
              footer: "Presiona el botón para copiarlas"
            })
          }
        }
      }
    }, { messageId: generateMessageID() });

    return;  // Salir después de procesar el comando .9
  }