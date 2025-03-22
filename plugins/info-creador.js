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

    let bot = 'Solo un Bot';

    let numBot = conn.user.jid.split('@')[0]; 
    let botJid = numBot + '@s.whatsapp.net';
    let nameBot = await conn.getName(botJid) || 'Kirito-Bot';
    let aboutBot = (await conn.fetchStatus(botJid).catch(() => {}))?.status || 'Bot Oficial de Deylin';

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

    let vcardBot = `
BEGIN:VCARD
VERSION:3.0
N:;${nameBot};;;
FN:${nameBot}
TITLE:Asistente Virtual
TEL;waid=${numBot}:${new PhoneNumber('+' + numBot).getNumber('international')}
EMAIL:deylibaquedano801@gmail.com
URL:https://kirito-md.vercel.app/
NOTE:${aboutBot}
X-ABLabel: Desconocido 🔥
X-WA-BIZ-NAME:${nameBot}
X-WA-BIZ-DESCRIPTION:${aboutBot}
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