const axios = require('axios');

async function generarLogo(estilo, texto, m, conn) {
    try {
        const url = `https://flamingtext.com/net-fu/proxy_form.cgi?script=${estilo}-logo&text=${encodeURIComponent(texto)}`;

        await conn.sendMessage(m.chat, { image: { url }, caption: `Aquí tienes tu logo estilo *${estilo}* con el texto *${texto}*` }, { quoted: m });
    } catch (error) {
        console.error('Error al generar el logo:', error);
        await conn.sendMessage(m.chat, { text: '❌ Error al generar el logo. Prueba con otro estilo.' }, { quoted: m });
    }
}

// Uso en el bot
module.exports = {
    command: 'logo',
    description: 'Genera un logo con texto personalizado',
    execute: async (m, { conn, args }) => {
        if (args.length < 2) return m.reply('❌ Uso incorrecto. Ejemplo: /logo neon Kirito-Bot');
        const estilo = args[0].toLowerCase();
        const texto = args.slice(1).join(' ');
        await generarLogo(estilo, texto, m, conn);
    }
};