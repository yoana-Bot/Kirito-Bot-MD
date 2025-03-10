// código creado por Deylin 
// https://github.com/deylinqff
// no quites créditos 

import PhoneNumber from 'awesome-phonenumber';

async function handler(m, { conn }) { 
    let numcreador = '526641804242'; // Número del creador
    let ownerJid = numcreador + '@s.whatsapp.net';

    // Nombre y estado del creador con un toque de desesperación
    let name = await conn.getName(ownerJid) || 'Deylin'; 
    let about = (await conn.fetchStatus(ownerJid).catch(() => {}))?.status || '¡Ayuda urgente! Estoy disponible para cualquier consulta... 😟';

    // Crear vCard con un estado actualizado
    let vcard = `
BEGIN:VCARD
VERSION:3.0
N:;${name};;;
FN:${name}
TEL;waid=${numcreador}:${new PhoneNumber('+' + numcreador).getNumber('international')}
NOTE:${about}
END:VCARD`.trim();

    // Enviar el vCard al chat
    await conn.sendMessage(m.chat, { 
        contacts: { 
            displayName: name, 
            contacts: [{ vcard }]
        } 
    }, { quoted: m });
}

handler.help = ['owner']; 
handler.tags = ['main']; 
handler.command = ['owner', 'creator', 'creador2', 'dueño'];

export default handler;