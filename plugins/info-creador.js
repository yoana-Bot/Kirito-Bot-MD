// Código creado por Deylin 
// https://github.com/deylinqff
// No quites créditos 

import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) { 
    // Datos del creador
    let numCreador = '50488198573';
    let ownerJid = numCreador + '@s.whatsapp.net';
    let nameCreador = await conn.getName(ownerJid) || 'Deylin'; 
    let aboutCreador = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || 'Sin descripción';
    let empresa = 'Deylin - Servicios Tecnológicos';

    // Datos del Bot (diferenciado y único: Lusete Bot)
    let numBot = conn.user.jid.split('@')[0]; 
    let botJid = numBot + '@s.whatsapp.net';
    // Aquí se forza un nombre único para el Bot
    let nameBot = 'Lusete Bot';
    let aboutBot = (await conn.fetchStatus(botJid).catch(() => {}))?.status || 'Bot de asistencia personalizada';

    // VCard del creador
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

    // VCard del Bot con datos únicos y diferentes
    let vcardBot = `
BEGIN:VCARD
VERSION:3.0
N:;${nameBot};;;
FN:${nameBot}
ORG:Lusete - Asistente Virtual;
TITLE:Bot de Asistencia Personalizada
TEL;waid=${numBot}:${new PhoneNumber('+' + numBot).getNumber('international')}
EMAIL:contacto@lusetebot.com
URL:https://lusetebot.com
NOTE:Un bot único y diferente, creado para ofrecer asistencia personalizada. ${aboutBot}
X-ABLabel:Soporte Técnico
END:VCARD`.trim();

    // Envío de ambos contactos en un solo mensaje
    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: 'Deylin & Lusete Bot', 
            contacts: [{ vcard: vcardCreador }, { vcard: vcardBot }]
        } 
    }, { quoted: m });
}

handler.help = ['owner']; 
handler.tags = ['main']; 
handler.command = ['owner', 'creator', 'creador', 'dueño'];

export default handler;