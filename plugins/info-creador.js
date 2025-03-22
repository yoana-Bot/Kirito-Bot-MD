// Código creado por Deylin 
// https://github.com/deylinqff
// No quites créditos 

import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) { 
    let numCreador = '50488198573';
    let ownerJid = numCreador + '@s.whatsapp.net';
    let nameCreador = await conn.getName(ownerJid) || 'Deylin'; 
    let aboutCreador = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || 'Sin descripción';
    let empresa = 'Deylin - Servicios Tecnológicos';

    // Datos propios del Bot
    let botLabel = 'Solo un Bot';
    let numBot = conn.user.jid.split('@')[0]; 
    let botJid = numBot + '@s.whatsapp.net';
    let nameBot = await conn.getName(botJid) || 'Kirito-Bot';
    let aboutBot = (await conn.fetchStatus(botJid).catch(() => {}))?.status || 'Bot Oficial de Deylin';

    // VCard del creador con detalles propios y diferenciados
    let vcardCreador = `
BEGIN:VCARD
VERSION:3.0
N:;${nameCreador};;;
FN:${nameCreador}
ORG:${empresa};
TITLE:CEO & Fundador
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:deylibaquedano801@gmail.com
URL:https://kirito-md.vercel.app/
NOTE:${aboutCreador}
X-ABLabel:+50488198573
X-WA-BIZ-NAME:${nameCreador}
X-WA-BIZ-DESCRIPTION:${aboutCreador}
END:VCARD`.trim();

    // VCard del Bot con datos y formato diferenciado
    let vcardBot = `
BEGIN:VCARD
VERSION:3.0
N:;${nameBot};;;
FN:${nameBot}
ORG:Automated Bot Services;
TITLE:Asistente Virtual
TEL;waid=${numBot}:${new PhoneNumber('+' + numBot).getNumber('international')}
EMAIL:bot@kirito-md.com
URL:https://bot.kirito-md.vercel.app/
NOTE:${aboutBot}
X-ABLabel:Contacto Bot
X-WA-BIZ-NAME:${nameBot}
X-WA-BIZ-DESCRIPTION:Automatización y asistencia virtual
END:VCARD`.trim();

    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: 'Deylin & Kirito-Bot', 
            contacts: [{ vcard: vcardCreador }, { vcard: vcardBot }]
        } 
    }, { quoted: m });
}

handler.help = ['owner']; 
handler.tags = ['main']; 
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;