// El ID del canal al que deseas que el bot se suscriba
global.channelId = '120363365444927738@newsletter';  // Usamos la ID de tu canal

async function joinChannel(conn, userId) {
    try {
        // Hacemos que el bot siga el canal
        await conn.newsletterFollow(global.channelId);
        console.log(`El usuario ${userId} ahora sigue el canal ${global.channelId}`);
    } catch (error) {
        console.error(`Error al seguir el canal ${global.channelId}:`, error);
    }
}

// Esta función se ejecutará cuando un usuario se convierta en subbot
async function onSubBot(m, conn) {
    let userId = m.sender; // Obtiene el ID del usuario que se convierte en subbot

    // Llama a la función que hace que el bot siga el canal
    await joinChannel(conn, userId);

    // Puedes enviar un mensaje de confirmación si lo deseas
    await conn.sendMessage(m.chat, { text: `¡Ahora sigues el canal!` });
}

// Este sería el trigger cuando el usuario se convierte en subbot
handler.on('subbot', async (m, conn) => {
    await onSubBot(m, conn);
});