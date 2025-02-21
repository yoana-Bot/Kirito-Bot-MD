import db from '../lib/database.js';
import fs from 'fs';
import { createHash } from 'crypto';
import fetch from 'node-fetch';

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i;

let handler = async function (m, { conn, text, usedPrefix, command }) {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let user = global.db.data.users[m.sender];
    let name2 = conn.getName(m.sender);

    if (user.registered) {
        await conn.sendMessage(m.chat, { 
            text: `「 ✦ 」Ya estás registrado.\n\n⚔️ *¿Quieres volver a registrarte?*\n\nUsa *${usedPrefix}unreg* para eliminar tu registro.` 
        }, { quoted: m });
        return;
    }

    if (!Reg.test(text)) {
        await conn.sendMessage(m.chat, { 
            text: `「 ✦ 」Formato incorrecto.\n\n🛡️ Uso: *${usedPrefix + command} nombre.edad*\n🔹 Ejemplo: *${usedPrefix + command} ${name2}.18*` 
        }, { quoted: m });
        return;
    }

    let [_, name, splitter, age] = text.match(Reg);
    if (!name) {
        await conn.sendMessage(m.chat, { text: `「 ✦ 」El nombre no puede estar vacío.` }, { quoted: m });
        return;
    }
    if (!age) {
        await conn.sendMessage(m.chat, { text: `「 ✦ 」La edad no puede estar vacía.` }, { quoted: m });
        return;
    }
    if (name.length >= 100) {
        await conn.sendMessage(m.chat, { text: `「 ✦ 」El nombre es demasiado largo.` }, { quoted: m });
        return;
    }

    age = parseInt(age);
    if (age > 1000) {
        await conn.sendMessage(m.chat, { text: `「 ✦ 」Wow, un anciano guerrero quiere jugar al bot.` }, { quoted: m });
        return;
    }
    if (age < 5) {
        await conn.sendMessage(m.chat, { text: `「 ✦ 」¡Un bebé espadachín se ha unido! ⚔️` }, { quoted: m });
        return;
    }

    user.name = name + ' ✓';
    user.age = age;
    user.regTime = +new Date;
    user.registered = true;
    global.db.data.users[m.sender].coin += 40;
    global.db.data.users[m.sender].exp += 300;
    global.db.data.users[m.sender].joincount += 20;

    let sn = createHash('md5').update(m.sender).digest('hex').slice(0, 20);

    let regbot = `┏━━━━━━━━━━━✦\n`;
    regbot += `┃  ✧ 𝗞𝗜𝗥𝗜𝗧𝗢-𝗕𝗢𝗧 ✧\n`;
    regbot += `┣━━━━━━━━━━━✦\n`;
    regbot += `┃ ⚔️ *Usuario Registrado* ⚔️\n`;
    regbot += `┃\n`;
    regbot += `┃ 🏷️ *Nombre:* ${name}\n`;
    regbot += `┃ 🎂 *Edad:* ${age} años\n`;
    regbot += `┃ 🔰 *ID:* ${sn}\n`;
    regbot += `┣━━━━━━━━━━━✦\n`;
    regbot += `┃ 🎁 *Recompensas*\n`;
    regbot += `┃ 💰 *Monedas:* 40\n`;
    regbot += `┃ ⭐ *Exp:* 300\n`;
    regbot += `┃ 🎟️ *Tokens:* 20\n`;
    regbot += `┣━━━━━━━━━━━✦\n`;
    regbot += `┃  *${dev}*\n`;
    regbot += `┗━━━━━━━━━━━✦\n`;

    await m.react('📩');

    let imagenFija = 'https://files.catbox.moe/xr2m6u.jpg'; // URL de la imagen fija

    await conn.sendMessage(m.chat, { 
        image: { url: imagenFija },
        caption: regbot,
        buttons: [
            {
                buttonId: '.menu',
                buttonText: { displayText: '👑 Menú' },
                type: 1
            },
            {
                buttonId: '.profile',
                buttonText: { displayText: '🌟 Perfil' },
                type: 1
            }
        ],
        headerType: 4,
        footer: 'Selecciona una opción:'
    }, { quoted: m });
}

handler.help = ['reg'];
handler.tags = ['rg'];
handler.command = ['verify', 'verificar', 'reg', 'register', 'registrar'];

export default handler;