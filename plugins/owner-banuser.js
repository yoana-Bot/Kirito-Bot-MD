var handler = async (m, { conn, text, usedPrefix, command }) => {
    let user, number, bot, bant, ownerNumber, aa, users, usr, q, mime, img;

    try {
        function no(number) {
            return number.replace(/\s/g, '').replace(/([@+-])/g, '');
        }

        const rawText = text.trim();
        let [num, ...reasonArr] = rawText.split(' ');
        let reason = reasonArr.join(' ') || 'Sin razón especificada';

        if (!num && !m.quoted) {
            user = conn.user.jid.split`@`[0] + '@s.whatsapp.net';
            bant = `${emoji} Por favor, etiqueta o escribe el número del usuario al que quieres banear del Bot.`;
            return conn.reply(m.chat, bant, m, { mentions: [user] });
        }

        num = no(num);
        if (isNaN(num)) {
            number = num.split`@`[1];
        } else {
            number = num;
        }

        if (num) {
            user = number + '@s.whatsapp.net';
        } else if (m.quoted && m.quoted.sender) {
            user = m.quoted.sender;
        } else if (m.mentionedJid) {
            user = number + '@s.whatsapp.net';
        }

        number = user.split('@')[0];
        bot = conn.user.jid.split`@`[0];

        if (user === conn.user.jid) {
            return conn.reply(m.chat, `${emoji2} @${bot} No puede ser baneado con este comando.`, m, { mentions: [user] });
        }

        for (let i = 0; i < global.owner.length; i++) {
            ownerNumber = global.owner[i][0];
            if (user.replace(/@s\.whatsapp\.net$/, '') === ownerNumber) {
                aa = ownerNumber + '@s.whatsapp.net';
                await conn.reply(m.chat, `${emoji2} No puedo banear al propietario @${ownerNumber} de *${botname}*.`, m, { mentions: [aa] });
                return;
            }
        }

        users = global.db.data.users;
        if (users[user]?.banned === true) {
            return conn.reply(m.chat, `${emoji2} No es necesario volver a banear a @${number}.`, m, { mentions: [user] });
        }

        if (!users[user]) users[user] = {}; // Asegurar que exista
        users[user].banned = true;

        let nn = conn.getName(m.sender);
        usr = m.sender.split('@')[0];
        await conn.reply(m.chat, `${done} Usuario baneado con éxito.\n*Razón:* ${reason}`, m, { mentions: [user] });

        let nametag = conn.getName(user);
        await conn.reply(`${suittag}@s.whatsapp.net`, `${emoji} El usuario *${nametag}* ha sido Baneado por *${nn}*.\n*Razón:* ${reason}`, m);

    } catch (e) {
        await conn.reply(m.chat, `${emoji} Ocurrió un error.`, m);
        console.log(e);
    }
};

handler.help = ['banuser <@tag|número> <razón>'];
handler.command = ['banuser'];
handler.tags = ['mods'];
handler.rowner = true;

export default handler;