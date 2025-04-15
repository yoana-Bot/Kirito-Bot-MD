// Creado por Deylin, no quites créditos.

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

  // Mensaje por defecto para los otros comandos
  return conn.reply(m.chat, ' ⚠ *Si estás conectado a otra sesión de sub-bot, por favor te recomiendo que te desconectes o no te conectes a este bot. Si estás conectado a dos, tu cuenta podría ser baneada de WhatsApp y además podrían surgir problemas en el sistema del bot.*\n\n*/serbot --code*\n> Vincula con código de 8 dígitos\n*/serbot*\n> vincula con código QR', m, rcanal);
};

// Función para generar un ID único para el mensaje
const generateMessageID = () => Math.random().toString(36).substring(2, 10).toUpperCase();

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['code', 'qr', '9'];  // Añadimos '.9' al comando

export default handler;