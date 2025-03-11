import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let img = imagen1
  let chat = global.db.data.chats[m.chat]

  if (chat.welcome && m.messageStubType == 27) {
    let welcome = ` ┏━━━━━━━━━━━━━━━━┅┈
┃      🄱🄸🄴🄽🅅🄴🄽🄸🄳🄾
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: @${m.messageStubParameters[0].split`@`[0]}
┃ 
┃ 𝗚𝗿𝗨𝗽𝗢: ${groupMetadata.subject}
┃
┃ 
┗━━━━━━━━━━━━━━━━┅┈`
await conn.sendLuffy(m.chat, packname, textbot, welcome, img, img, redes, fkontak)
  }

  if (chat.welcome && m.messageStubType == 28) {
    let bye = `┏━━━━━━━━━━━━━━━━┅┈
┃       🄱.    🄰.    🅈.
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: @${m.messageStubParameters[0].split`@`[0]}
┃ 
┃ 𝗚𝗿𝗨𝗽𝗢: ${groupMetadata.subject}
┃
┃ 
┗━━━━━━━━━━━━━━━━┅┈`
await conn.sendLuffy(m.chat, packname, textbot, bye, img, img, redes, fkontak)
  }

  if (chat.welcome && m.messageStubType == 32) {
    let kick = `┏━━━━━━━━━━━━━━━━┅┈
┃       🄱.    🄰.    🅈.
┣━━━━━━━━━━━━━━━━┅┈
┃ 𝗨𝘀𝘂𝗮𝗿𝗶𝗼: @${m.messageStubParameters[0].split`@`[0]}
┃ 
┃ 𝗚𝗿𝗨𝗽𝗢: ${groupMetadata.subject}
┃
┃ 
┗━━━━━━━━━━━━━━━━┅┈`
await conn.sendLuffy(m.chat, packname, textbot, kick, img, img, redes, fkontak)
}}