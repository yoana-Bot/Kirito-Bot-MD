export async function before(m, { conn, orgs, participants, groupMetadata }) {

let group = m.chat
let link = 'https://chat.whatsapp.com/' + await conn.groupInviteCode(group)
conn.reply(m.chat, '\t\t☆ 𝐂𝐨𝐦𝐩𝐚𝐫𝐭𝐞 ☆\n𝗚𝗿𝗨𝗽𝗢: ${groupMetadata.subject}\n\v' + link, m, { detectLink: true })

}
handler.help = ['link']
handler.tags = ['grupo']
handler.command = ['link', 'enlace']
handler.group = true
handler.botAdmin = true

export default handler