conn.ev.on('group-participants.update', async (update) => {
  try {
    // Asegurarse de que existe el objeto de configuración del grupo
    global.db.data.chats ||= {};
    global.db.data.chats[update.id] ||= {};

    const chat = global.db.data.chats[update.id];

    for (let participant of update.participants) {
      if (participant === conn.user.jid && update.action === 'add') {
        if (chat.welcomed) return; // Ya se envió el mensaje antes

        const metadata = await conn.groupMetadata(update.id);
        const groupName = metadata.subject;

        await conn.sendMessage(update.id, {
          text: `✨ ¡Hola a todos!\n\nSoy *Kirito-Bot MD*, uno de los mejores bots de WhatsApp desarrollado por *Deylin*.\n\nGracias por añadirme al grupo *${groupName}*.\n\nEscribe *.menu* para ver todos mis comandos.`
        });

        chat.welcomed = true; // Marcar que ya se envió el mensaje
      }
    }
  } catch (err) {
    console.error('Error al enviar mensaje de bienvenida al grupo:', err);
  }
});