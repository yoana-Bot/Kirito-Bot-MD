//© Código hecho por Deylin 

import axios from 'axios';

async function generarLogo(estilo, texto, m, conn) {
    try {
        // Enviar mensaje de progreso
        const mensajeProgreso = await conn.sendMessage(m.chat, { text: '⏳ Generando tu logo, espera un momento...' }, { quoted: m });

        // Generar la URL del logo
        const url = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=${estilo}-logo&text=${encodeURIComponent(texto)}`;

        // Enviar el logo generado
        await conn.sendMessage(m.chat, { 
            image: { url }, 
            caption: `Aquí tienes tu logo estilo *${estilo}* con el texto *${texto}*` 
        }, { quoted: m });

        // Eliminar el mensaje de progreso
        await conn.sendMessage(m.chat, { delete: mensajeProgreso.key });

    } catch (error) {
        console.error('Error al generar el logo:', error);
        await conn.sendMessage(m.chat, { 
            text: '❌ Error al generar el logo. Prueba con otro estilo.' 
        }, { quoted: m });
    }
}

const handler = async (m, { conn, args }) => {
    if (!args || args.length < 2) {
        const ejemplo = `Ejemplo: /logo neon Kirito-Bot

Estilos disponibles:
- 3D
- Animado
- Azul
- Marca
- Negocios
- Colorido
- Fresco
- Decorado
- Efectos
- Famoso
- Fuego
- Diversión
- Resplandor
- Oro
- Verde
- Horror
- Luz
- Líquido
- Metal
- Película
- Naturaleza
- Neón
- Púrpura
- Orgullo
- Promoción
- Rojo
- Reflexión
- Retro
- Plata
- Web 2.0
- Deportes
- Textura
- Otros`;

        return conn.sendMessage(m.chat, { text: `❌ Uso incorrecto.\n\n${ejemplo}` }, { quoted: m });
    }

    const estilo = args[0].toLowerCase();
    const texto = args.slice(1).join(' ');

    await generarLogo(estilo, texto, m, conn);
};

handler.help = ['logo'];
handler.tags = ['fun'];
handler.command = ['logo'];

export default handler;