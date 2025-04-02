import config from '../config.js'; // Asegúrate de que la ruta es correcta
import fs from 'fs';

let handler = async (m, { conn }) => {
    let img = './src/catalogo.jpg';

    // Verificar si config.owner está definido y es un array
    if (!config.owner || !Array.isArray(config.owner)) {
        console.error("Error: config.owner no está definido o no es un array");
        return m.reply("⚠️ Error: No se pudo cargar la lista de staff.");
    }

    // Formatear la lista de dueños
    let staffList = config.owner.map(([number, name]) => `- ${name} (${number})`).join('\n');
    let staffMessage = `🌟 *Lista de Staff* 🌟\n\n${staffList}`;

    // Verificar si la imagen existe antes de enviarla
    if (!fs.existsSync(img)) {
        console.error(`Error: La imagen ${img} no existe.`);
        return m.reply("⚠️ Imagen no encontrada.");
    }

    // Enviar imagen con el mensaje
    await conn.sendFile(m.chat, img, 'staff.jpg', staffMessage.trim(), m);
};

handler.help = ['staff'];
handler.command = ['colaboradores', 'staff'];
handler.register = true;
handler.tags = ['main'];

export default handler;