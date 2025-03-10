import fetch from 'node-fetch'
import PhoneNumber from 'awesome-phonenumber'

export async function before(m, { conn, participants, groupMetadata }) {
    const fkontak = { 
        key: { fromMe: false, participant: '0@s.whatsapp.net' }, 
        message: { conversation: '¡Hola!' } 
    };

    if (!m.messageStubType || !m.isGroup) return true;

    let userId = m.messageStubParameters[0];

    const welcomeImage = 'https://files.catbox.moe/56el7x.jpg';
    const goodbyeImage = 'https://files.catbox.moe/56el7x.jpg';

    let pp;
    try {
        pp = await conn.profilePictureUrl(userId, 'image');
    } catch (error) {
        pp = null;
    }

    let img;
    try {
        img = await (await fetch(pp || welcomeImage)).buffer();
    } catch (fetchError) {
        img = await (await fetch(welcomeImage)).buffer();
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

    // Mensaje de bienvenida cuando un usuario se une al grupo (StubType 27)
    if (chat.welcome && m.messageStubType === 27) {
        let wel = ` 
┏━━━━━━━━━━━━━━━━┅┈
┃      🄱🄸🄴🄽🅅🄴🄽🄸🄳🄾
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: @${userId.split`@`[0]} 
┃ 
┃ 𝗚𝗿𝘂𝗽𝗼: ${groupMetadata.subject} 
┃
┃ 𝗙𝗲𝗰𝗵𝗮 𝘆 𝗛𝗼𝗿𝗮: ${datetime}
┗━━━━━━━━━━━━━━━━┅┈

𝗗𝗲𝘀𝗰𝗿𝗶𝗽𝗰𝗶𝗼𝗻 𝗱𝗲𝗹 𝗴𝗿𝘂𝗽𝗼: ${groupDesc}`;
        try {
            await conn.sendMini(m.chat, packname, dev, wel, img, img, channel, fkontak);
        } catch (sendError) {
            console.error('Error al enviar mensaje de bienvenida:', sendError);
        }
    }

    // Mensaje de despedida cuando un usuario sale del grupo (StubType 28)
    if (chat.welcome && m.messageStubType === 28) {
        let bye = `
┏━━━━━━━━━━━━━━━━┅┈
┃      🄱.   🄰.   🅈.
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: @${userId.split`@`[0]} 
┃ 
┃ 𝗚𝗿𝘂𝗽𝗼: ${groupMetadata.subject} 
┃
┃ 𝗙𝗲𝗰𝗵𝗮 𝘆 𝗛𝗼𝗿𝗮: ${datetime}
┗━━━━━━━━━━━━━━━━┅┈`;
        let img2;
        try {
            img2 = await (await fetch(goodbyeImage)).buffer(); 
            await conn.sendMini(m.chat, packname, dev, bye, img2, img2, channel, fkontak);
        } catch (sendError) {
            console.error('Error al enviar mensaje de despedida:', sendError);
        }
    }

    // Mensaje de expulsión cuando un usuario es eliminado del grupo (StubType 32)
    if (chat.welcome && m.messageStubType === 32) {
        let kick = `
┏━━━━━━━━━━━━━━━━┅┈
┃      🄱.   🄰.   🅈.
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: @${userId.split`@`[0]} 
┃ 
┃ 𝗚𝗿𝘂𝗽𝗼: ${groupMetadata.subject} 
┃
┃ 𝗙𝗲𝗰𝗵𝗮 𝘆 𝗛𝗼𝗿𝗮: ${datetime}
┗━━━━━━━━━━━━━━━━┅┈`;
        let img3;
        try {
            img3 = await (await fetch(goodbyeImage)).buffer();
            await conn.sendMini(m.chat, packname, dev, kick, img3, img3, channel, fkontak);
        } catch (sendError) {
            console.error('Error al enviar mensaje de expulsión:', sendError);
        }
    }

    // Mensaje cuando alguien añade a otro usuario al grupo (StubType 29)
    if (chat.welcome && m.messageStubType === 29) { 
        let adder = m.messageStubParameters[0]; // ID de quien añadió
        let addedUser = m.messageStubParameters[1]; // ID del añadido

        let welcomeMsg = `
┏━━━━━━━━━━━━━━━━┅┈
┃      🄱.   🄰.   🅈.
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼 𝗮𝗴𝗿𝗲𝗴𝗮𝗱𝗼: @${addedUser.split`@`[0]} 
┃ 𝗔𝗴𝗿𝗲𝗴𝗮𝗱𝗼 𝗽𝗼𝗿: @${adder.split`@`[0]}
┃ 
┃ 𝗚𝗿𝘂𝗽𝗼: ${groupMetadata.subject} 
┃
┃ 𝗙𝗲𝗰𝗵𝗮 𝘆 𝗛𝗼𝗿𝗮: ${datetime}
┗━━━━━━━━━━━━━━━━┅┈`;
        let img3;
        try {
            img3 = await (await fetch(welcomeImage)).buffer();
            await conn.sendMini(m.chat, packname, dev, welcomeMsg, img3, img3, channel, fkontak);
        } catch (e) {
            console.error(e);
        }
    }
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