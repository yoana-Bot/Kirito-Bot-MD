import fs from 'fs';

let handler = async (m, { conn }) => {
    let img = './src/catalogo.jpg';

    
    let staffList = [
        ["1234567890", "Apal"],
        ["0987654321", "xd"],
        ["1122334455", "M"]
    ];

    
    let staffMessage = "🌟 *Lista de Staff* 🌟\n\n" +
        staffList.map(([number, name]) => `- ${name}:\n (https://wa.me/${number})`).join('\n');

   
    if (!fs.existsSync(img)) {
        console.error(`Error: La imagen ${img} no existe.`);
        return m.reply("⚠️ Imagen no encontrada.");
    }

    
    await conn.sendFile(m.chat, img, 'staff.jpg', staffMessage.trim(), m, { linkPreview: true });
};

handler.help = ['staff'];
handler.command = ['colaboradores', 'staff'];
handler.register = true;
handler.tags = ['main'];

export default handler;