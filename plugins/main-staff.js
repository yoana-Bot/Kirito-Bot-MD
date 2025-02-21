let handler = async (m, { conn, command, usedPrefix }) => {
let img = './src/catalogo.jpg'
let staff = `𝐍𝐨 𝐝𝐢𝐬𝐩𝐨𝐧𝐢𝐛𝐥𝐞
`
await conn.sendFile(m.chat, img, 'kirito.jpg', staff.trim(), fkontak)
}
  
handler.help = ['staff']
handler.command = ['colaboradores', 'staff']
handler.register = true
handler.tags = ['main']

export default handler
