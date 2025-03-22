import { WAMessageStubType } from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, { conn, participants, groupMetadata }) {
  if (!m.messageStubType || !m.isGroup) return !0;

  let who = m.messageStubParameters[0]
  let taguser = `@${who.split('@')[0]}`
  let chat = global.db.data.chats[m.chat]
  let totalMembers = participants.length
  let date = new Date().toLocaleString('es-ES', { timeZone: 'America/Mexico_City' })

  let frasesBienvenida = [
    "¡Esperamos que disfrutes tu estadía!",
    "Recuerda leer las reglas del grupo.",
    "Diviértete y participa en las conversaciones.",
    "¡Un placer tenerte aquí!"
  ]
  let frasesDespedida = [
    "Esperamos verte pronto de nuevo.",
    "¡Suerte en tus proyectos futuros!",
    "Hasta la próxima, cuídate.",
    "Nos vemos en otra ocasión."
  ]

  let fraseRandomBienvenida = frasesBienvenida[Math.floor(Math.random() * frasesBienvenida.length)]
  let fraseRandomDespedida = frasesDespedida[Math.floor(Math.random() * frasesDespedida.length)]

  let videoUrl = 'https://files.catbox.moe/jlgz1s.mp4'

  if (chat.welcome) {
    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_ADD) {
      let bienvenida = `┏━━━━━━━━━━━━━━━━┅┈
┃      🄱🄸🄴🄽🅅🄴🄽🄸🄳🄾
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: ${taguser}
┃ 
┃ 𝗚𝗿𝗨𝗽𝗢: ${groupMetadata.subject}
┃ 
┃ 𝗠𝗶𝗲𝗺𝗯𝗿𝗼𝘀: ${totalMembers + 1} 
┃
┃ 𝗙𝗲𝗰𝗵𝗮: ${date}
┃
┗━━━━━━━━━━━━━━━━┅┈
${fraseRandomBienvenida}`
      await conn.sendMessage(m.chat, { video: { url: videoUrl }, gifPlayback: true, caption: bienvenida, mentions: [who] })
    }

    if (m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_LEAVE || 
        m.messageStubType === WAMessageStubType.GROUP_PARTICIPANT_REMOVE) { 
      let despedida = `┏━━━━━━━━━━━━━━━━┅┈
┃       🄱.    🄰.    🅈.
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: ${taguser}
┃ 
┃ 𝗚𝗿𝗨𝗽𝗢: ${groupMetadata.subject} 
┃
┃ 𝗠𝗶𝗲𝗺𝗯𝗿𝗼𝘀: ${totalMembers - 1} 
┃
┃ 𝗙𝗲𝗰𝗵𝗮: ${date}
┃
┗━━━━━━━━━━━━━━━━┅┈
${fraseRandomDespedida}`
      await conn.sendMessage(m.chat, { video: { url: videoUrl }, gifPlayback: true, caption: despedida, mentions: [who] })
    }
  }
}