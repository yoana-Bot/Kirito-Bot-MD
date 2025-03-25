let handler = async (m, { conn, text }) => {
    if (!text) return m.reply(`⚠️ Por favor, ingrese el error que desea reportar.`)
    if (text.length < 10) return m.reply(`⚠️ Especifique bien el error, mínimo 10 caracteres.`)
    if (text.length > 1000) return m.reply(`⚠️ Máximo 1000 caracteres para enviar el error.`)

    const teks = `*✖️ \`R E P O R T E\` ✖️*

☁️ Número:
• Wa.me/${m.sender.split`@`[0]}

👤 Usuario: 
• ${m.pushName || 'Anónimo'}

💬 Mensaje:
• ${text}`

    let grupo = '120363399467898268@g.us' // Grupo de reportes
    let creador = (global.owner && global.owner[0]) ? global.owner[0] + '@s.whatsapp.net' : null // Verifica que haya un creador definido

    let enviadoGrupo = false
    let enviadoCreador = false

    try {
        await conn.sendMessage(grupo, { text: teks, mentions: conn.parseMention(teks) })
        enviadoGrupo = true
    } catch (e) {
        console.error(`❌ Error al enviar reporte al grupo:`, e)
    }

    if (creador) {
        try {
            await conn.sendMessage(creador, { text: teks, mentions: conn.parseMention(teks) })
            enviadoCreador = true
        } catch (e) {
            console.error(`❌ Error al enviar reporte al creador:`, e)
        }
    }

    if (enviadoGrupo && enviadoCreador) {
        m.reply(`✅ El reporte fue enviado al grupo de reportes y al creador.`)
    } else if (enviadoGrupo) {
        m.reply(`⚠️ El reporte fue enviado al grupo de reportes, pero hubo un error al enviarlo al creador.`)
    } else if (enviadoCreador) {
        m.reply(`⚠️ El reporte fue enviado al creador, pero hubo un error al enviarlo al grupo de reportes.`)
    } else {
        m.reply(`❌ Hubo un error al enviar el reporte. Inténtelo nuevamente.`)
    }
}

handler.help = ['reportar']
handler.tags = ['info']
handler.command = ['reporte', 'report', 'reportar', 'bug', 'error']

export default handler