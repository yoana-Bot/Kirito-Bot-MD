let handler = async (m, { conn, command, usedPrefix }) => {
    let img = './src/catalogo.jpg';
    
    
    let staffList = config.owner.map(([number, name]) => `- ${name} \n (${number})`).join('\n');
    
    let staffMessage = `🌟 *Lista de Staff* 🌟\n\n${staffList}`;
    
    await conn.sendFile(m.chat, img, 'staff.jpg', staffMessage.trim(), m);
};

handler.help = ['staff'];
handler.command = ['colaboradores', 'staff'];
handler.register = true;
handler.tags = ['main'];

export default handler;