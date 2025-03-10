import fetch from 'node-fetch'
import PhoneNumber from 'awesome-phonenumber'

export async function before(m, { conn, participants, groupMetadata }) {
    const fkontak = { 
        key: { fromMe: false, participant: '0@s.whatsapp.net' }, 
        message: { conversation: '¡Hola!' } 
    };

    if (!m.messageStubType || !m.isGroup) return true;

    let userId = m.messageStubParameters[0]; // Usuario afectado (añadido/eliminado)
    let actorId = m.messageStubParameters[1] || 'Desconocido'; // Quien lo añadió/eliminó

    const defaultImage = 'https://files.catbox.moe/56el7x.jpg';
    let pp;
    try {
        pp = await conn.profilePictureUrl(userId, 'image');
    } catch (error) {
        pp = null;
    }

    let img;
    try {
        img = await (await fetch(pp || defaultImage)).buffer();
    } catch (fetchError) {
        img = await (await fetch(defaultImage)).buffer();
    }

    let chat = global.db.data.chats[m.chat];
    let phoneNum = userId.split('@')[0];
    if (!phoneNum.startsWith('+')) phoneNum = '+' + phoneNum;
    const pn = new PhoneNumber(phoneNum);
    let region = pn.getRegionCode();
    const countryTimezones = {
        MX: "America/Mexico_City",
        US: "America/New_York",
        GB: "Europe/London",
        IN: "Asia/Kolkata",
        BR: "America/Sao_Paulo",
        AR: "America/Argentina/Buenos_Aires",
        HN: "America/Tegucigalpa"
    };
    let timezone = countryTimezones[region] || "UTC";
    let datetime = new Date().toLocaleString("en-US", { timeZone: timezone });

    let groupDesc = groupMetadata.desc || 'Sin descripción';

    if (chat.welcome && m.messageStubType === 27) { // Usuario añadido
        let welcomeMsg = ` 
┏━━━━━━━━━━━━━━━━┅┈
┃      🄱🄸🄴🄽🅅🄴🄽🄸🄳🄾
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: @${userId.split`@`[0]} 
┃ 𝗔ñ𝗮𝗱𝗶𝗱𝗼 𝗽𝗼𝗿: @${actorId.split`@`[0]} 
┃ 
┃ 𝗚𝗿𝘂𝗽𝗼: ${groupMetadata.subject} 
┃
┃ 𝗙𝗲𝗰𝗵𝗮 𝘆 𝗛𝗼𝗿𝗮: ${datetime}
┗━━━━━━━━━━━━━━━━┅┈

𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶ó𝗻 𝗱𝗲𝗹 𝗴𝗿𝘂𝗽𝗼: ${groupDesc}`;

        await conn.sendMessage(m.chat, { text: welcomeMsg, mentions: [userId, actorId] }, { quoted: fkontak });
        await conn.sendMessage(m.chat, { image: img, caption: 'Bienvenido al grupo' }, { quoted: fkontak });
    }

    if (chat.welcome && m.messageStubType === 29) { // Usuario eliminado
        let removeMsg = ` 
┏━━━━━━━━━━━━━━━━┅┈
┃      🄴🄻🄸🄼🄸🄽🄰🄳🄾
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: @${userId.split`@`[0]} 
┃ 𝗘𝗹𝗶𝗺𝗶𝗻𝗮𝗱𝗼 𝗽𝗼𝗿: @${actorId.split`@`[0]} 
┃ 
┃ 𝗚𝗿𝘂𝗽𝗼: ${groupMetadata.subject} 
┃
┃ 𝗙𝗲𝗰𝗵𝗮 𝘆 𝗛𝗼𝗿𝗮: ${datetime}
┗━━━━━━━━━━━━━━━━┅┈`;

        await conn.sendMessage(m.chat, { text: removeMsg, mentions: [userId, actorId] }, { quoted: fkontak });
    }

    return true;
}


/*let WAMessageStubType = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let vn = 'https://files.catbox.moe/wo866r.m4a';
  let vn2 = 'https://files.catbox.moe/hmuevx.opus';
  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

 if (chat.welcome && m.messageStubType === 27) {
    this.sendMessage(m.chat, { audio: { url: vn }, 
    contextInfo: { forwardedNewsletterMessageInfo: { 
    newsletterJid: "120363307382381547@newsletter",
    serverMessageId: '', 
    newsletterName: namechannel }, forwardingScore: 9999999, isForwarded: true, mentionedJid: getMentionedJid(), "externalAdReply": { 
    "title": `(ಥ ͜ʖಥ) 𝙒 𝙀 𝙇 𝘾 𝙊 𝙈 𝙀 (◕︿◕✿)`, 
    "body": `${userName}`, 
    "previewType": "PHOTO", 
    "thumbnailUrl": null,
    "thumbnail": icons, 
    "sourceUrl": redes, 
    "showAdAttribution": true}}, 
     seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    this.sendMessage(m.chat, { audio: { url: vn2 }, 
    contextInfo: { forwardedNewsletterMessageInfo: { 
    newsletterJid: "120363322713003916@newsletter",
    serverMessageId: '', 
    newsletterName: namechannel }, forwardingScore: 9999999, isForwarded: true, mentionedJid: getMentionedJid(), "externalAdReply": { 
    "title": `(oꆤ︵ꆤo) 𝘼 𝘿 𝙄 𝙊 𝙎 (|||❛︵❛.)`, 
    "body": `${userName}, Soy gay asi que me voy.`, 
    "previewType": "PHOTO", 
    "thumbnailUrl": null,
    "thumbnail": icons, 
    "sourceUrl": redes, 
    "showAdAttribution": true}}, 
     seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
  }
}*/


/*let WAMessageStubType = (await import('@whiskeysockets/baileys')).default;
import fetch from 'node-fetch';

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return true;

  let vn = 'https://files.catbox.moe/wo866r.m4a';
  let vn2 = 'https://files.catbox.moe/hmuevx.opus';
  let chat = global.db.data.chats[m.chat];
  const getMentionedJid = () => {
    return m.messageStubParameters.map(param => `${param}@s.whatsapp.net`);
  };

  let who = m.messageStubParameters[0] + '@s.whatsapp.net';
  let user = global.db.data.users[who];

  let userName = user ? user.name : await conn.getName(who);

 if (chat.welcome && m.messageStubType === 27) {
    this.sendMessage(m.chat, { audio: { url: vn }, 
    contextInfo: { forwardedNewsletterMessageInfo: { 
    newsletterJid: "120363307382381547@newsletter",
    serverMessageId: '', 
    newsletterName: namechannel }, forwardingScore: 9999999, isForwarded: true, mentionedJid: getMentionedJid(), "externalAdReply": { 
    "title": `(ಥ ͜ʖಥ) 𝙒 𝙀 𝙇 𝘾 𝙊 𝙈 𝙀 (◕︿◕✿)`, 
    "body": `${userName}`, 
    "previewType": "PHOTO", 
    "thumbnailUrl": null,
    "thumbnail": icons, 
    "sourceUrl": redes, 
    "showAdAttribution": true}}, 
     seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
}

  if (chat.welcome && (m.messageStubType === 28 || m.messageStubType === 32)) {
    this.sendMessage(m.chat, { audio: { url: vn2 }, 
    contextInfo: { forwardedNewsletterMessageInfo: { 
    newsletterJid: "120363322713003916@newsletter",
    serverMessageId: '', 
    newsletterName: namechannel }, forwardingScore: 9999999, isForwarded: true, mentionedJid: getMentionedJid(), "externalAdReply": { 
    "title": `(oꆤ︵ꆤo) 𝘼 𝘿 𝙄 𝙊 𝙎 (|||❛︵❛.)`, 
    "body": `${userName}, Soy gay asi que me voy.`, 
    "previewType": "PHOTO", 
    "thumbnailUrl": null,
    "thumbnail": icons, 
    "sourceUrl": redes, 
    "showAdAttribution": true}}, 
     seconds: '4556', ptt: true, mimetype: 'audio/mpeg', fileName: `error.mp3` }, { quoted: fkontak, ephemeralExpiration: 24*60*100, disappearingMessagesInChat: 24*60*100})
  }
}*/