// Creado por Deylin no quites créditos.

const handler = async (m, { conn }) => {
  await conn.relayMessage(m.chat, {
    viewOnceMessage: {
      message: {
        messageContextInfo: {},
        nativeFlowMessage: {
          buttons: [
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "qr",
                copy_code: "serbot"
              })
            },
            {
              name: "cta_copy",
              buttonParamsJson: JSON.stringify({
                display_text: "Code",
                copy_code: "/serbot code"
              })
            }
          ],
          messageParamsJson: JSON.stringify({
            text: "Uso correcto del comando:",
            footer: "¡MITSURI - KANROJI - BOT!"
          })
        }
      }
    }
  }, { messageId: generateMessageID() });
};

const generateMessageID = () => Math.random().toString(36).substring(2, 10).toUpperCase();

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['code', 'Code'];

export default handler;