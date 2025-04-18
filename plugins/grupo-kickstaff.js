var handler = async (m, { conn, participants, usedPrefix, command }) => {
    if (!m.mentionedJid[0] && !m.quoted) {
        return conn.reply(m.chat, `⚠️ Debes mencionar a un usuario para poder expulsarlo del grupo de staff.`, m);
    }

    let user = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted.sender;

    const groupInfo = await conn.groupMetadata(m.chat);
    const ownerGroup = groupInfo.owner || m.chat.split`-`[0] + '@s.whatsapp.net';
    const ownerBot = global.owner[0][0] + '@s.whatsapp.net';

    if (user === conn.user.jid) {
        return conn.reply(m.chat, `⚠️ No puedo eliminar al bot del grupo.`, m);
    }

    if (user === ownerGroup) {
        return conn.reply(m.chat, `⚠️ No puedo eliminar al propietario del grupo.`, m);
    }

    if (user === ownerBot) {
        return conn.reply(m.chat, `⚠️ No puedo eliminar al propietario del bot.`, m);
    }


    const imageUrl = 'https://d.uguu.se/QoLLxwOk.jpg';


    await conn.sendMessage(user, {
        image: { url: imageUrl },
        caption: `⚠️ Tu participación es invaluable para nuestro staff.\n\nFuiste eliminado del *staff de Kirito Bot MD* por *inactividad* y por no aportar nada.\n\nGracias por tu tiempo.`,
    });


    await conn.groupParticipantsUpdate(m.chat, [user], 'remove');
};

handler.help = ['kickstaff'];
handler.tags = ['grupo'];
handler.command = ['kickstaff'];
handler.admin = true;
handler.group = true;
handler.register = true;
handler.botAdmin = true;

export default handler;