//© código creado por Deylin 
//https://github.com/deylinqff
//➤  no quites créditos 

import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;
  if (m.chat !== '120363416711925079@g.us') return !0; // Solo para el grupo del staff

  let who = m.messageStubParameters[0];
  let taguser = `@${who.split('@')[0]}`;
  let totalMembers = participants.length;
  let date = new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City' });

  let frasesBienvenida = [
    "¡Bienvenido al staff de Kirito-Bot!",
    "Recuerda que aquí se trabaja en equipo, participa activamente.",
    "Tu ayuda es clave para el éxito de Kirito-Bot.",
    "¡Un nuevo miembro del staff se une a la misión!",
    "Esperamos grandes cosas de ti, bienvenido."
  ];
  let frasesDespedida = [
    "Gracias por tu aporte al staff, te deseamos lo mejor.",
    "Nos vemos, esperamos contar contigo en el futuro.",
    "Tu tiempo aquí fue valioso, éxito en todo.",
    "Hasta la próxima, el equipo te recordará.",
    "Fue un honor tenerte en el staff, mucha suerte."
  ];

  let fraseRandomBienvenida = frasesBienvenida[Math.floor(Math.random() * frasesBienvenida.length)];
  let fraseRandomDespedida = frasesDespedida[Math.floor(Math.random() * frasesDespedida.length)];

  let videoUrl = 'https://files.catbox.moe/jlgz1s.mp4';

  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
    let bienvenida = `┏━━━━━━━━━━━━━━━━┅┈
┃    🅂🅃🄰🄵🄵  🄺🄸🅁🄸🅃🄾-🄱🄾🅃
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗡𝘂𝗲𝘃𝗼 𝗺𝗶𝗲𝗺𝗯𝗿𝗼: ${taguser}
┃ 𝗚𝗿𝘂𝗽𝗼: ${groupMetadata.subject}
┃ 𝗘𝗾𝘂𝗶𝗽𝗼 𝘁𝗼𝘁𝗮𝗹: ${totalMembers + 1}
┃ 𝗙𝗲𝗰𝗵𝗮: ${date}
┗━━━━━━━━━━━━━━━━┅┈
> ${fraseRandomBienvenida}`;

    await conn.sendMessage(m.chat, { video: { url: videoUrl }, gifPlayback: true, caption: bienvenida, mentions: [who] });
  }

  if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE ||
      m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) {
    let despedida = `┏━━━━━━━━━━━━━━━━┅┈
┃    🅂🅃🄰🄵🄵  🄺🄸🅁🄸🅃🄾-🄱🄾🅃
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗠𝗶𝗲𝗺𝗯𝗿𝗼 𝘀𝗮𝗹𝗶𝗲𝗻𝘁𝗲: ${taguser}
┃ 𝗚𝗿𝘂𝗽𝗼: ${groupMetadata.subject}
┃ 𝗘𝗾𝘂𝗶𝗽𝗼 𝘁𝗼𝘁𝗮𝗹: ${totalMembers - 1}
┃ 𝗙𝗲𝗰𝗵𝗮: ${date}
┗━━━━━━━━━━━━━━━━┅┈
> ${fraseRandomDespedida}`;

    await conn.sendMessage(m.chat, { video: { url: videoUrl }, gifPlayback: true, caption: despedida, mentions: [who] });
  }
}