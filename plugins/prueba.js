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

  // Ahora verificamos si el mensaje recibido tiene una respuesta seleccionada
  // Aquí deberías estar manejando la respuesta de la selección en un evento posterior
  // Dependiendo del framework, aquí podrías usar algo como conn.on('message') o usar
  // un manejador de eventos para capturar la respuesta del usuario y seguir con el flujo.

  // Verificamos si el mensaje tiene un "selectedRowId"
  if (m.selectedRowId) {
    const selectedOption = m.selectedRowId;
    
    // Dependiendo de la opción seleccionada, se envía un mensaje con la respuesta
    switch (selectedOption) {
      case 'opcion_1':
        await conn.sendMessage(m.chat, { text: "Has seleccionado la Opción 1" });
        break;
      case 'opcion_2':
        await conn.sendMessage(m.chat, { text: "Has seleccionado la Opción 2" });
        break;
      case 'opcion_3':
        await conn.sendMessage(m.chat, { text: "Has seleccionado la Opción 3" });
        break;
      default:
        await conn.sendMessage(m.chat, { text: "Opción no válida." });
        break;
    }
  } else {
    console.log("Esperando respuesta del usuario...");
  }
};

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['xd', 'Xd'];

export default handler;