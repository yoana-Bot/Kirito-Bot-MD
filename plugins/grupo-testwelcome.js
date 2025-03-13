import { WAMessageStubType } from '@whiskeysockets/baileys';
import fetch from 'node-fetch';

global.dfail = (type, m, usedPrefix, command, conn) => {
    if (!db.data.chats[m.chat].welcome && m.isGroup) {
        return m.reply(`${emoji} Para usar este comando debe activar las Bienvenidas con *#welcome*`, m, fake);
    }

    let chat = global.db.data.chats[m.chat];
    let mentions = text.trim();
    let who = mentions ? conn.parseMention(mentions) : [];
    
    if (!text) return conn.reply(m.chat, `${emoji} Menciona al usuario con @ para simular la bienvenida.`, m, fake);

    let taguser = `@${who[0].split('@')[0]}`;
    let groupMetadata = await conn.groupMetadata(m.chat);
    let defaultImage = 'https://files.catbox.moe/xr2m6u.jpg';

    let img;
    try {
        let pp = await conn.profilePictureUrl(who[0], 'image');
        img = await (await fetch(pp)).buffer();
    } catch {
        img = await (await fetch(defaultImage)).buffer();
    }

    let bienvenida = `┏━━━━━━━━━━━━━━━━┅┈
┃      
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: ${taguser}
┃ 
┃ 𝗚𝗿𝗨𝗽𝗢: ${groupMetadata.subject} 
┃
┗━━━━━━━━━━━━━━━━┅┈`;

    await conn.sendMessage(m.chat, { image: img, caption: bienvenida, mentions: who }, { quoted: fake });
};

handler.help = ['testwelcome @user'];
handler.tags = ['group'];
handler.command = ['welcome1'];
handler.admin = true;
handler.group = true;

export default handler; de 