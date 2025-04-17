// Creado por Deylin, no quites créditos.

let handler = async (m, { conn, usedPrefix, command, args }) => {
    let userId = m.sender;
    return conn.reply(m.chat, `Hola *@${userId.split('@')[0]}*`, m, { mentions: [userId] });
};

handler.tags = ['tools'];
handler.help = ['code', 'ñ'];
handler.command = ['code', 'ñ'];

export default handler;