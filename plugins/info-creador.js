// Código creado por Deylin 
// https://github.com/deylinqff
// No quites créditos 

import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) { 

    let empresa= 'kirito';

    let numBot= '50488198573';
    let ownerJid = numBot + '@s.whatsapp.net';
    let nameBot = await conn.getName(ownerJid) || 'Kirito-Bot-MD'; 
    let aboutBot = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || 'Sin descripción';


    let numCreador = conn.user.jid.split('@')[0]; 
    let CreadorJid = numCreador + '@s.whatsapp.net';
    let nameCreador = 'Deylin';
    let aboutCreador = (await conn.fetchStatus(CreadorJid).catch(() => {}))?.status || 'Bot de asistencia personalizada';


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
NOTE:Perfil oficial de ${nameCreador}. ${aboutCreador}
X-ABLabel:Contacto Directo
END:VCARD`.trim();


    let vcardBot = `
BEGIN:VCARD
VERSION:3.0
N:;${nameBot};;;
FN:${nameBot}
ORG: kirito - by Deylin;
TITLE:Creador para Asistencia Personalizadas
TEL;waid=${numCreador}:${new PhoneNumber('+' + numCreador).getNumber('international')}
EMAIL:contacto@lusetebot.com
URL:https://lusetebot.com
NOTE:Un bot único y diferente, creado para ofrecer asistencia personalizada. ${aboutBot}
X-ABLabel:Soporte Técnico
END:VCARD`.trim();


    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: 'Deylin & Lusete Bot', 
            contacts: [{ vcard: vcardBot }, { vcard: vcardCreador}]
        } 
    }, { quoted: m });
}

handler.help = ['owner']; 
handler.tags = ['main']; 
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;