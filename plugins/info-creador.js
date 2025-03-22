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
EMAIL:correo@empresa.com
URL:https://www.tuempresa.com
NOTE:${aboutCreador}
ADR:;;Dirección de tu empresa;;;;
X-ABADR:ES
X-ABLabel:Dirección Web
X-ABLabel:Correo Electrónico
X-ABLabel:Teléfono de contacto
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
EMAIL:bot@tuempresa.com
URL:https://www.tuempresa.com
NOTE:${aboutBot}
X-ABADR:ES
X-ABLabel:Dirección Web
X-ABLabel:Correo Electrónico
X-ABLabel:Teléfono del Bot
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