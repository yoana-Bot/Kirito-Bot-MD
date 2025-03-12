import axios from 'axios';

async function generarLogo(estilo, texto, m, sock) {
    try {
        const url = `https://flamingtext.com/net-fu/proxy_form.cgi?script=${estilo}-logo&text=${encodeURIComponent(texto)}`;

        await sock.sendMessage(m.chat, { 
            image: { url }, 
            caption: `Aquí tienes tu logo estilo *${estilo}* con el texto *${texto}*` 
        }, { quoted: m });
    } catch (error) {
        console.error('Error al generar el logo:', error);
        await sock.sendMessage(m.chat, { 
            text: '❌ Error al generar el logo. Prueba con otro estilo.' 
        }, { quoted: m });
    }
}

// Handler para el bot
const handler = async (m, { sock, args }) => {
    if (!args || args.length < 2) {
        return sock.sendMessage(m.chat, { text: '❌ Uso incorrecto. Ejemplo: /logo neon Kirito-Bot' }, { quoted: m });
    }

    const estilo = args[0].toLowerCase();
    const texto = args.slice(1).join(' ');

    await generarLogo(estilo, texto, m, sock);
};

handler.help = ['logo'];
handler.tags = ['fun'];
handler.command = /^logo$/i; // Asegura que reconozca el comando sin importar mayúsculas o minúsculas

export default handler;