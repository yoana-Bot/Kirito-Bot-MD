import fetch from 'node-fetch';

const handler = async (message, { conn, command, text, isAdmin }) => {
    if (command === 'mute') {
        if (!isAdmin) throw '👑 *Solo un administrador puede ejecutar este comando*';

        const ownerJid = global.owner[0][0] + '@s.whatsapp.net';
        if (message.mentionedJid[0] === ownerJid) throw '👑 *El creador del bot no puede ser mutado*';

        let targetJid = message.mentionedJid[0] 
            ? message.mentionedJid[0] 
            : message.quoted 
                ? message.quoted.sender 
                : text;

        if (targetJid === conn.user.jid) throw '🔥 *No puedes mutar el bot*';

        const groupMetadata = await conn.groupMetadata(message.chat);
        const groupOwner = groupMetadata.owner || message.chat.split`-`[0] + '@s.whatsapp.net';
        
        if (targetJid === groupOwner) throw '🔥 *No puedes mutar al creador del grupo*';

        // Asegurar que el usuario esté registrado en la base de datos
        if (!global.db.data.users[targetJid]) {
            global.db.data.users[targetJid] = { muted: false };
        }
        let userData = global.db.data.users[targetJid];

        if (userData.muted) throw '🔥 *Este usuario ya ha sido mutado*';

        const muteMessage = {
            key: {
                participants: '0@s.whatsapp.net',
                fromMe: false,
                id: 'Halo'
            },
            message: {
                locationMessage: {
                    name: 'Usuario mutado',
                    jpegThumbnail: await (await fetch('https://telegra.ph/file/f8324d9798fa2ed2317bc.png')).buffer(),
                    vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
                }
            },
            participant: '0@s.whatsapp.net'
        };

        if (!message.mentionedJid[0] && !message.quoted) {
            return conn.reply(message.chat, '🔥 *Menciona a la persona que deseas mutar*', message);
        }

        conn.reply(message.chat, '*Tus mensajes serán eliminados*', muteMessage, null, { mentions: [targetJid] });
        global.db.data.users[targetJid].muted = true;

    } else if (command === 'unmute') {
        if (!isAdmin) throw '👑 *Solo un administrador puede ejecutar este comando*';

        let targetJid = message.mentionedJid[0] 
            ? message.mentionedJid[0] 
            : message.quoted 
                ? message.quoted.sender 
                : text;

        // Asegurar que el usuario esté registrado en la base de datos
        if (!global.db.data.users[targetJid]) {
            global.db.data.users[targetJid] = { muted: false };
        }
        let userData = global.db.data.users[targetJid];

        if (!message.mentionedJid[0] && !message.quoted) {
            return conn.reply(message.chat, '🔥 *Menciona a la persona que deseas demutar*', message);
        }

        if (!userData.muted) throw '🔥 *Este usuario no ha sido mutado*';

        const unmuteMessage = {
            key: {
                participants: '0@s.whatsapp.net',
                fromMe: false,
                id: 'Halo'
            },
            message: {
                locationMessage: {
                    name: 'Usuario demutado',
                    jpegThumbnail: await (await fetch('https://telegra.ph/file/aea704d0b242b8c41bf15.png')).buffer(),
                    vcard: 'BEGIN:VCARD\nVERSION:3.0\nN:;Unlimited;;;\nFN:Unlimited\nORG:Unlimited\nTITLE:\nitem1.TEL;waid=19709001746:+1 (970) 900-1746\nitem1.X-ABLabel:Unlimited\nX-WA-BIZ-DESCRIPTION:ofc\nX-WA-BIZ-NAME:Unlimited\nEND:VCARD'
                }
            },
            participant: '0@s.whatsapp.net'
        };

        conn.reply(message.chat, '*Tus mensajes no serán eliminados*', unmuteMessage, null, { mentions: [targetJid] });
        global.db.data.users[targetJid].muted = false;
    }
};

handler.command = ['mute', 'unmute'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

export default handler;