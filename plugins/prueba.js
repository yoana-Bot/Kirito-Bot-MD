// Creado por Deylin no quites creditos.

const handler = async (m, { conn }) => {
  const listMessage = {
    text: "⚠ *Si estás conectado a otra sesión de sub-bot, por favor te recomiendo que te desconectes o no te conectes a este bot. Si estás conectado a dos, tu cuenta podría ser baneada de WhatsApp y además podrían surgir problemas en el sistema del bot.*",
    buttonText: "Selecciona una opción",
    sections: [
      {
        title: "Opciones",
        rows: [
          { title: "Opción 1", rowId: "opcion_1" },
          { title: "Opción 2", rowId: "opcion_2" },
          { title: "Opción 3", rowId: "opcion_3" }
        ]
      }
    ]
  };

  await conn.sendMessage(m.chat, listMessage);
};

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['x','X'];

export default handler;