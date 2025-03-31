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

let pp = ''
let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender
//let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://telegra.ph/file/327f6ad853cb4f405aa80.jpg')

global.creador = 'Wa.me/50488198373'
global.ofcbot = `${conn.user.jid.split('@')[0]}`
global.asistencia = 'Wa.me/50488198573'
global.namechannel = '𝐊𝐢𝐫𝐢𝐭𝐨 - 𝐁𝐨𝐭 𝐌𝐃 • ᥙ⍴ძᥲ𝗍ᥱs ฅ՞•ﻌ•՞ฅ'
global.namechannel2 = '𝐤𝐢𝐫𝐢𝐭𝐨 -𝐁𝐨𝐭 𝐌𝐃 • ᥲ᥎іs᥆s ฅ՞•ﻌ•՞ฅ'
global.namegrupo = '𝐊𝐢𝐫𝐢𝐭𝐨 -𝐁𝐨𝐭 𝐌𝐃 • ᥆𝖿іᥴіᥲᥣ ˙Ⱉ˙ฅ'
global.namecomu = '𝐤𝐢𝐫𝐢𝐭𝐨- 𝐁𝐨𝐭 𝐌𝐃 • ᥴ᥆mᥙᥒі𝗍ᥡ ˙Ⱉ˙ฅ'
global.listo = ' *Aquí tienes ˙Ⱉ˙ฅ*'
global.fotoperfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://files.catbox.moe/xr2m6u.jpg')

//Reacciones De Comandos.!
global.rwait = '🕒'
global.done = '✅'
global.error = '✖️'


global.emoji = '*❛‿˂̵✧*'
global.emoji2 = '*（＾∀＾●）ﾉｼ*'
global.emoji3 = '*ฅ°ㅅ°ฅ*'
global.emoji4 = '*ฅ՞•ﻌ•՞ฅ*'
global.emoji5 = '*˙Ⱉ˙ฅ*'
global.emojis = [emoji, emoji2, emoji3, emoji4, emoji5].getRandom()

//mensaje en espera
global.wait = 'ฅ՞•ﻌ•՞ฅ *𝗘𝘀𝗽𝗲𝗿𝗮 𝗨𝗻 𝗠𝗼𝗺𝗲𝗻𝘁𝗼, 𝗦𝗼𝘆 𝗟𝗲𝗻𝘁𝗼 ...*';

//Enlaces
var github = 'https://github.com/deylinqff/Kirito-Bot-MD' 
var web = 'https://kirito-md.vercel.app/' 
let instagram = 'https://www.instagram.com/'

global.redes = [github, web, instagram].getRandom()

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
global.nombre = conn.getName(m.sender)
global.taguser = '@' + m.sender.split("@s.whatsapp.net")
var more = String.fromCharCode(8206)
global.readMore = more.repeat(850)

global.authsticker = `┊🤖 Bot Ofc\n┊↳ ${wm}\n\n┊👑 Usuario\n┊↳ @${conn.getName(m.sender)}\n`;

global.packsticker = `┊ 👑 kirito-Bot MD\n↳https://kirito-md.vercel.app/\n\n┊ 🔥 ɪɴғᴏʀᴍᴀᴄɪᴏɴ\n↳https://github.com/deylinqff/Kirito-Bot-MD`

//Fakes
global.fkontak = { key: { participants:"0@s.whatsapp.net", "remoteJid": "status@broadcast", "fromMe": false, "id": "Halo" }, "message": { "contactMessage": { "vcard": `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=50488198573:50488198573\nitem1.X-ABLabel:Ponsel\nEND:VCARD` }}, "participant": "0@s.whatsapp.net" }

global.fake = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: '120363365444927738@newsletter', newsletterName: "👑 . ˚ Cһᥲᥒᥒᥱᥣ 〢𝚔𝚒𝚛𝚒𝚝𝚘 - 𝙱𝚘𝚝 𝙼𝙳 ☆˒˒", serverMessageId: -1 }
}}, { quoted: m }

//Id Channel
global.idchannel = '120363365444927738@newsletter'
global.canalIdM = ["120363365444927738@newsletter", "120363365444927738@newsletter"]
global.canalNombreM = ["✯ 🄺🄸🅁🄸🅃🄾 - 🅲🅷🅰🅽🅽🅴🅻 ✯", "⏤͟͟͞͞𝐤𝐢𝐫𝐢𝐭𝐨 - 𝐁𝐨𝐭『𝐌𝐃』"]
global.channelRD = await getRandomChannel()

global.icono = [ 
'https://i.postimg.cc/3JjzVC0N/IMG-20250318-WA0969.jpg',
'https://i.postimg.cc/3JjzVC0N/IMG-20250318-WA0969.jpg',
'https://i.postimg.cc/3JjzVC0N/IMG-20250318-WA0969.jpg',
'https://i.postimg.cc/3JjzVC0N/IMG-20250318-WA0969.jpg',
'https://i.postimg.cc/3JjzVC0N/IMG-20250318-WA0969.jpg',
'https://i.postimg.cc/3JjzVC0N/IMG-20250318-WA0969.jpg'
].getRandom()

global.rcanal = { contextInfo: { isForwarded: true, forwardedNewsletterMessageInfo: { newsletterJid: channelRD.id, serverMessageId: 100, newsletterName: channelRD.name, }, externalAdReply: { showAdAttribution: true, title: textbot, body: '👑҉Kirito- Bot MDᚐ', mediaUrl: null, description: null, previewType: "PHOTO", thumbnailUrl: icono, sourceUrl: redes, mediaType: 1, renderLargerThumbnail: false }, }, }}

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