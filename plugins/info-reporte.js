let handler = async (m, { conn, text, isOwner, isROwner }) => {
    if (!text) return m.reply(`${emoji} Por favor, ingrese el error que desea reportar.`)
    if (text.length < 10) return m.reply(`${emoji} Especifique bien el error, mínimo 10 caracteres.`)
    if (text.length > 1000) return m.reply(`${emoji2} *Máximo 1000 caracteres para enviar el error.*`)

    const teks = `*✖️ \`R E P O R T E\` ✖️*

☁️ Número:
• Wa.me/${m.sender.split`@`[0]}

👤 Usuario: 
• ${m.pushName || 'Anónimo'}

💬 Mensaje:
• ${text}`

    let destino = '120363399467898268@g.us' // Grupo de reportes

    if (global.db.data.users[m.sender]?.sudbot || isOwner || isROwner) {
        destino = global.owner[0] + '@s.whatsapp.net' // Creador si es un SUDBOT
    }

    try {
        await conn.sendMessage(destino, { text: teks, mentions: conn.parseMention(teks) })
        m.reply(`${emoji} El reporte se envió correctamente.`)
    } catch (e) {
        m.reply(`${emoji2} Hubo un error al enviar el reporte. Inténtelo nuevamente.`)
        console.error(e)
    }
}

handler.help = ['reportar']
handler.tags = ['info']
handler.command = ['reporte', 'report', 'reportar', 'bug', 'error']

export default handler