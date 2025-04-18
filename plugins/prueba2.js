conn.ev.on('group-participants.update', async (update) => {
  try {
    const metadata = await conn.groupMetadata(update.id);
    const groupName = metadata.subject;

    // Verifica si el bot es el que se ha unido
    for (let participant of update.participants) {
      if (participant === conn.user.id && update.action === 'add') {
        await conn.sendMessage(update.id, {
          text: `✦ Hola, soy *Kirito-Bot MD*, uno de los mejores bots de WhatsApp desarrollado por *Deylin*. Gracias por añadirme a *${groupName}*. Usa *.menu* para ver mis comandos.`
        });
      }
    }
  } catch (err) {
    console.error('Error al enviar mensaje de bienvenida al grupo:', err);
  }
});