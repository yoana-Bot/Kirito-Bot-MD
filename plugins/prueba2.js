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
          text: `✨ ¡Hola a todos!\n\nSoy *Kirito-Bot MD*, uno de los mejores bots de WhatsApp desarrollado por *Deylin*.\n\nGracias por añadirme al grupo *${groupName}*.\n\nEscribe *.menu* para ver todos mis comandos.`,
          footer: 'Kirito-Bot MD | by Deylin',
          buttons: [
            { buttonId: '.menu', buttonText: { displayText: 'Ver Menú' }, type: 1 },
            { buttonId: '.estado', buttonText: { displayText: 'Estado del Bot' }, type: 1 }
          ],
          headerType: 1
        });

        chat.welcomed = true; // Marcar que ya se envió el mensaje
      }
    }
  } catch (err) {
    console.error('Error al enviar mensaje de bienvenida al grupo:', err);
  }
});