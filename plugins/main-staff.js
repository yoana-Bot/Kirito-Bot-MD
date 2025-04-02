import config from '../config.js'; // Asegúrate de que la ruta sea correcta

let handler = async (m, { conn, command, usedPrefix }) => {
    try {
        let img = './src/catalogo.jpg';

        // Verificar si config.owner está definido y es un array
        if (!config.owner || !Array.isArray(config.owner)) {
            throw new Error('La propiedad owner no está definida o no es un array en config.js');
        }

        // Formatear la lista de dueños desde config.js
        let staffList = config.owner.map(([number, name]) => `- ${name} (${number})`).join('\n');

        let staffMessage = `🌟 *Lista de Staff* 🌟\n\n${staffList}`;

        await conn.sendFile(m.chat, img, 'staff.jpg', staffMessage.trim(), m);
    } catch (error) {
        console.error("Error en main-staff.js:", error);
        conn.reply(m.chat, "⚠️ Error interno al obtener la lista del staff.", m);
    }
};

handler.help = ['staff'];
handler.command = ['colaboradores', 'staff'];
handler.register = true;
handler.tags = ['main'];

export default handler;