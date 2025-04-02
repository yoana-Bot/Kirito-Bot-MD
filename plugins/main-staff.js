import fs from 'fs';

let handler = async (m, { conn }) => {
    let img = './src/catalogo.jpg';

    // Lista de Staff directamente en el código
    let staffList = [
        ["1234567890", "Admin Principal"],
        ["0987654321", "Soporte Técnico"],
        ["1122334455", "Moderador General"]
    ];

    // Formatear la lista de staff
    let staffMessage = "🌟 *Lista de Staff* 🌟\n\n" +
        staffList.map(([number, name]) => `- ${name} (${number})`).join('\n');

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