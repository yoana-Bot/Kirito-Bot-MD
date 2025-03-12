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

  // Envía el mensaje con la lista de opciones
  await conn.sendMessage(m.chat, listMessage);

  // Aquí puedes esperar que el usuario seleccione una opción y luego manejar la respuesta
  // Este es un ejemplo de cómo manejar la respuesta en función del comando
  if (m.selectedRowId) {
    switch (m.selectedRowId) {
      case 'opcion_1':
        await conn.sendMessage(m.chat, { text: "Has seleccionado Opción 1" });
        break;
      case 'opcion_2':
        await conn.sendMessage(m.chat, { text: "Has seleccionado Opción 2" });
        break;
      case 'opcion_3':
        await conn.sendMessage(m.chat, { text: "Has seleccionado Opción 3" });
        break;
      default:
        await conn.sendMessage(m.chat, { text: "Opción no válida" });
        break;
    }
  }
};

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['xd', 'Xd'];

export default handler;