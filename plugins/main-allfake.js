import pkg from '@whiskeysockets/baileys'
import fs from 'fs'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone'
const { generateWAMessageFromContent, prepareWAMessageMedia, proto } = pkg

var handler = m => m
handler.all = async function (m) {

global.getBuffer = async function getBuffer(url, options) {
try {
options ? options : {}
var res = await axios({
method: "get",
url,
headers: {
'DNT': 1,
'User-Agent': 'GoogleBot',
'Upgrade-Insecure-Request': 1
},
...options,
responseType: 'arraybuffer'
})
return res.data
} catch (e) {
console.log(`Error : ${e}`)
}}

//creador y otros
global.creador = 'Wa.me/50433191934'
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.asistencia = 'Wa.me/50433191934'
global.namechannel = '࿋ོ༙𝐊𝐢𝐫𝐢𝐭𝐨-𝑩𝒐𝒕 𝑴𝑫 𝐂𝐡𝐚𝐧𝐧𝐞𝐥࿐ཽ༵'
global.namechannel2 = '᭄𝐊𝐢𝐫𝐢𝐭𝐨-𝐁𝐨𝐭 𝐌𝐃 👑ᬊᬁ"'
global.namegrupo = '𝑲𝒊𝒓𝒊𝒕𝒐-𝑩𝒐𝒕'
global.namecomu = 'ᬊ𝑲𝒊𝒓𝒊𝒕𝒐 𝑩𝒐𝒕 𝑴𝑫 𝑪𝒐𝒎𝒖𝒏𝒊𝒕𝒚ᬊ᭄'
global.listo = '⚡ *ᴀǫᴜɪ ᴛɪᴇɴᴇs ˙Ⱉ˙ฅ*'
global.fotoperfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://i.postimg.cc/RFdNynN5/IMG-20250315-WA0122.jpg')

global.idchannel = '120363365444927738@newsletter'
global.canalIdM = ["120363365444927738@newsletter", "120363365444927738@newsletter"]
global.canalNombreM = [" ๖ۣ•҉𝑲𝒊𝒓𝒊𝒕𝒐-𝑩𝒐𝒕 𝑴𝑫 𝑪𝒉𝒂𝒏𝒏𝒆𝒍★᭄", "᭄𝑲𝒊𝒓𝒊𝒕𝒐-𝑩𝒐𝒕 𝑴𝑫ᬊ᭄"]
global.channelRD = await getRandomChannel()

//fechas
global.d = new Date(new Date + 3600000)
global.locale = 'es'
global.dia = d.toLocaleDateString(locale, {weekday: 'long'})
global.fecha = d.toLocaleDateString('es', {day: 'numeric', month: 'numeric', year: 'numeric'})
global.mes = d.toLocaleDateString('es', {month: 'long'})
global.año = d.toLocaleDateString('es', {year: 'numeric'})
global.tiempo = d.toLocaleString('en-US', {hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true})

//Reacciones De Comandos.!
global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'
global.msm = '⚠︎'

global.emoji = '*❛‿˂̵✧*'
global.emoji2 = '*（＾∀＾●）ﾉｼ*'
global.emoji3 = '*ฅ°ㅅ°ฅ*'
global.emoji4 = '*ฅ՞•ﻌ•՞ฅ*'
global.emoji5 = '*˙Ⱉ˙ฅ*'
global.emojis = [emoji, emoji2, emoji3, emoji4, emoji5].getRandom()

//mensaje en espera
global.wait = '*˙Ⱉ˙ฅ* *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, 𝗦𝗼𝘆 𝗟𝗲𝗻𝘁𝗼 ...*';
global.waitt = '*˙Ⱉ˙ฅ* *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, 𝗦𝗼𝘆 𝗟𝗲𝗻𝘁𝗼 ...*';
global.waittt = '*ฅ՞•ﻌ•՞ฅ* *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, 𝗦𝗼𝘆 𝗟𝗲𝗻𝘁𝗼 ...*';
global.waitttt = '*ฅ՞•ﻌ•՞ฅ* *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, 𝗦𝗼𝘆 𝗟𝗲𝗻𝘁𝗼 ...*';

//Enlaces
var canal = 'https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m'  
let canal2 = 'https://whatsapp.com/channel/0029VawF8fBBvvsktcInIz3m'
var git = 'https://github.com/deylinqff'
var github = 'https://github.com/deylinqff/Kirito-Bot-MD' 
let correo = 'deylibaquedano801@gmail.com'

global.redes = [canal, canal2, git, github, correo].getRandom()

//Imagen
let category = "imagen"
const db = './src/database/db.json'
const db_ = JSON.parse(fs.readFileSync(db))
const random = Math.floor(Math.random() * db_.links[category].length)
const randomlink = db_.links[category][random]
const response = await fetch(randomlink)
const rimg = await response.buffer()
global.icons = rimg

//• ↳ ◜𝑻𝑰𝑬𝑴𝑷𝑶 𝑹𝑷𝑮◞ • ⚔
var ase = new Date(); var hour = ase.getHours(); switch(hour){ case 0: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 1: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 2: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 3: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 4: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 5: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 6: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 7: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌅'; break; case 8: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 9: hour = 'Lɪɴᴅᴀ Mᴀɴ̃ᴀɴᴀ 🌄'; break; case 10: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 11: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 12: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 13: hour = 'Lɪɴᴅᴏ Dɪᴀ 🌤'; break; case 14: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 15: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 16: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 17: hour = 'Lɪɴᴅᴀ Tᴀʀᴅᴇ 🌆'; break; case 18: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 19: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 20: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 21: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 22: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break; case 23: hour = 'Lɪɴᴅᴀ Nᴏᴄʜᴇ 🌃'; break;}
global.saludo = hour;

//tags
global.nombre = m.pushName || 'Anónimo'
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

//Fakes
let pp = null; try { pp = await conn.profilePictureUrl('50433191934@s.whatsapp.net', 'image') } catch (e) { pp = null } global.fkontak = { key: {participant: `0@s.whatsapp.net`, ...(m.chat ? { remoteJid: `120363416711925079@g.us` } : {}) }, message: { 'contactMessage': { 'displayName': `Deylin creador`, 'vcard': `BEGIN:VCARD\nVERSION:3.0\nN:XL;Deylin creador,;;;\nFN:Deylin creador\nitem1.TEL;waid=50433191934:50433191934\nitem1.X-ABLabel:Ponsel\nEND:VCARD`, 'jpegThumbnail': pp ? await (await fetch(pp)).buffer() : null, thumbnail: null, sendEphemeral: true }}}

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, newsletterName: channelRD.name, serverMessageId: -1 }
}}, { quoted: m }




conn.ev.on('chats.upsert', async (chats) => {
  for (const chat of chats) {
    if (!chat.id.endsWith('@g.us')) continue // Solo grupos

    try {
      const metadata = await conn.groupMetadata(chat.id)
      const mentions = metadata.participants.map(p => p.id)

      const Kirito = {
        text: `*kirito-bot MD | 1 De los mejores bots de WhatsApp*\n\n*creador:* Deylin`,
        contextInfo: {
          isForwarded: true,
          mentionedJid: mentions,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363365444927738@newsletter',
            newsletterName: '★KIRITO-BOT✪',
            serverMessageId: -1
          }
        }
      }

      await conn.sendMessage(chat.id, Kirito)
    } catch (e) {
      console.error('Error enviando mensaje al nuevo grupo:', e)
    }
  }
})



global.icono = [ 
'https://i.postimg.cc/RFdNynN5/IMG-20250315-WA0122.jpg',
'https://i.postimg.cc/RFdNynN5/IMG-20250315-WA0122.jpg',
'https://i.postimg.cc/RFdNynN5/IMG-20250315-WA0122.jpg',
'https://i.postimg.cc/3JjzVC0N/IMG-20250318-WA0969.jpg',
'https://i.postimg.cc/3JjzVC0N/IMG-20250318-WA0969.jpg',
'https://i.postimg.cc/3JjzVC0N/IMG-20250318-WA0969.jpg'
].getRandom()

global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: 100, newsletterName: channelRD.name, }, externalAdReply: { showAdAttribution: true, title: packname, body: dev, mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }, }, }}

export default handler

function pickRandom(list) {
return list[Math.floor(Math.random() * list.length)]
  }

async function getRandomChannel() {
let randomIndex = Math.floor(Math.random() * canalIdM.length)
let id = canalIdM[randomIndex]
let name = canalNombreM[randomIndex]
return { id, name }
}