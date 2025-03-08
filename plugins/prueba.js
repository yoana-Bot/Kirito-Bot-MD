let handler = async (m, { conn, usedPrefix, command, args }) => {
       return conn.reply(m.chat, 'Falta el texto.', m, fake);
    // Aquí se envía el texto proporcionado por el usuario
    conn.reply(m.chat, `Mensaje recibido: ${text}`, m, rcanal);
};

handler.help = ['demo *<texto>*'];
handler.command = ['de', 'openai'];
handler.tags = ['ai'];

export default handler;