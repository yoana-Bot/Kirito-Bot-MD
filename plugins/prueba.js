async function joinChannels(conn, userId) {
    // Iteramos sobre los canales que deseas seguir
    for (const channelId of Object.values(global.ch)) {
        try {
            // Cuando un usuario se convierte en subbot, hacemos que el bot siga el canal
            await conn.newsletterFollow(channelId);
            console.log(`El usuario ${userId} ahora está siguiendo el canal ${channelId}`);
        } catch (error) {
            console.error(`Error al intentar seguir el canal ${channelId}:`, error);
        }
    }
}

// Esta función se ejecutará cuando un usuario se convierta en subbot
async function onSubBot(m, conn) {
    let userId = m.sender; // Obtenemos el ID del usuario

    // Llamamos a la función que hace que el bot siga los canales
    await joinChannels(conn, userId);

    // Puedes agregar un mensaje de confirmación si lo deseas
    await conn.sendMessage(m.chat, { text: `¡Ahora estás siguiendo los canales!` });
}

// Este sería el trigger cuando el usuario se convierte en subbot
handler.on('subbot', async (m, conn) => {
    await onSubBot(m, conn);
});