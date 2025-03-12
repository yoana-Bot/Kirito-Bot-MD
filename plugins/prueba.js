const axios = require('axios');

async function generarLogo(estilo, texto, m, sock) {
    try {
        const url = `https://flamingtext.com/net-fu/proxy_form.cgi?script=${estilo}-logo&text=${encodeURIComponent(texto)}`;

        await sock.sendMessage(m.key.remoteJid, { 
            image: { url }, 
            caption: `Aquí tienes tu logo estilo *${estilo}* con el texto *${texto}*` 
        }, { quoted: m });
    } catch (error) {
        console.error('Error al generar el logo:', error);
        await sock.sendMessage(m.key.remoteJid, { 
            text: '❌ Error al generar el logo. Prueba con otro estilo.' 
        }, { quoted: m });
    }
}

// Handler para el bot
const handler = async (m, { sock, args }) => {
    if (args.length < 2) return sock.sendMessage(m.key.remoteJid, { text: '❌ Uso incorrecto. Ejemplo: /logo neon Kirito-Bot' }, { quoted: m });

    const estilo = args[0].toLowerCase();
    const texto = args.slice(1).join(' ');

    await generarLogo(estilo, texto, m, sock);
};

handler.help = ['logo'];
handler.command = ['logo'];
handler.tags = ['editor'];

export default handler