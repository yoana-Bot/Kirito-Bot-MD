import fs from 'fs';

let handler = async (m, { conn }) => {
    let img = './src/catalogo.jpg';

    
    let creador = [['50488198573', '*Deylin 👑*']];

    
    let staff = [
        ['59169739411', '*~Iván⁩*'],
        ['573007796996', '*~𝕄𝕠𝕣𝕒𝕝𝕖𝕤⁩*'],
        ['50231458537', '*Brayan Moscoso*'],
        ['584245610338', '*José*'],
        ['50557865603', '*Willzek 🎩*'],
        ['51928616320', '*Manuel*'],
        ['50557333744', '*Jonathang*'],
        ['573154062343', '*http*'],
        ['526671548329', '*~/ty.{LegnaJS}⁩*'],
        ['526633900512', '*Brayan*'],
        ['51920227615', '*~ai.SEƗSĦƗROṈȺGƗ.il⁩*']
    ];

    
    let staffMessage = "🌟 *Lista de Staff* 🌟\n\n";
    
    
    staffMessage += "*👑 Creador 👑*\n\n";
    staffMessage += creador.map(([number, name]) => `- ${name}:\n> https://wa.me/${number}\n\n`).join('');
    
   
    staffMessage += "🎩 *Colaboradores* 🎩\n\n";
    staffMessage += staff.map(([number, name]) => `- ${name}:\n> https://wa.me/${number}\n\n`).join('');

    
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