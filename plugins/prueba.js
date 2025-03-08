handler.help = ['demo *<texto>*'];
handler.command = ['de', 'openai'];
handler.tags = ['ai'];
handler.group = true;

handler.run = async (m, { conn, text, rcanal }) => {
    if (!text) return conn.reply(m.chat, 'Falta el texto.', m, rcanal);
    // Aquí se envía el texto proporcionado por el usuario
    conn.reply(m.chat, `Mensaje recibido: ${text}`, m, rcanal);
};

export default handler;