import fs from 'fs';

let handler = async (m, { conn }) => {
    let img = './src/catalogo.jpg';

    
    let creador = ['50488198573', 'Deylin 👑', true ]

    lat staff = [
  [ '59169739411', '*~Iván⁩*', true ],
  [ '573007796996', '*~𝕄𝕠𝕣𝕒𝕝𝕖𝕤⁩*', true ],
  [ '50231458537', '*Brayan moscoso*', true ],
  [ '584245610338', '*jose*', true ],
  [ '50557865603', '*willzek 🎩*', true ],
  [ '51928616320', '*manuel*', true ],
  [ '50557333744', '*Jonathang*', true ],
  [ '573154062343', '*http*', true ],
  [ '526671548329', '*~/ty.{LegnaJS}⁩*', true ],
  [ '526633900512', '*Braya*n⁩ ', true ],
  [ '51920227615', '*~ai.SEƗSĦƗROṈȺGƗ.il⁩* ',true ]
]

    
    let staffMessage = "🌟 *Lista de Staff* 🌟\n\n" +


let staffMessage = "*creador*\n\n" +
        creador.map(([number, name]) => `- ${name}:\n https://wa.me/${number}\n\n`).join('\n');
let staffMessage = " *colaboradores* \n\n" +
staff.map(([number, name]) => `- ${name}:\n https://wa.me/${number}\n\n`).join('\n');

   
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