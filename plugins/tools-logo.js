//© Código hecho por Deylin 

import axios from 'axios';

async function generarLogo(estilo, texto, m, conn, esVideo = false) {
    try {
        // Enviar mensaje de progreso
        const mensajeProgreso = await conn.sendMessage(m.chat, { text: '⏳ Generando tu logo, espera un momento...' }, { quoted: m });

        // Generar la URL del logo
        const url = `https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=${estilo}-logo&text=${encodeURIComponent(texto)}`;

        if (esVideo) {
            // Enviar el logo como GIF/Video
            await conn.sendMessage(m.chat, { 
                video: { url }, 
                caption: `Aquí tienes tu logo animado estilo *${estilo}* con el texto *${texto}*`, 
                gifPlayback: true // Esto hace que el video se reproduzca como GIF en WhatsApp
            }, { quoted: m });
        } else {
            // Enviar el logo como imagen
            await conn.sendMessage(m.chat, { 
                image: { url }, 
                caption: `Aquí tienes tu logo estilo *${estilo}* con el texto *${texto}*` 
            }, { quoted: m });
        }

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

    // Lista de estilos disponibles
    const estilosDisponibles = [
        '3d', 'animado', 'azul', 'marca', 'negocios', 'colorido', 'fresco', 'decorado', 'efectos', 
        'famoso', 'fuego', 'diversión', 'resplandor', 'oro', 'verde', 'horror', 'luz', 'líquido', 
        'metal', 'película', 'naturaleza', 'neón', 'púrpura', 'orgullo', 'promoción', 'rojo', 
        'reflexión', 'retro', 'plata', 'web-2.0', 'deportes', 'textura', 'otros'
    ];

    // Validar si el estilo ingresado está en la lista
    if (!estilosDisponibles.includes(estilo)) {
        return conn.sendMessage(m.chat, { text: `❌ El estilo *${estilo}* no existe.\n\nUsa uno de los siguientes estilos:\n${estilosDisponibles.map(e => `- ${e}`).join('\n')}` }, { quoted: m });
    }

    // Lista de estilos que son animados
    const estilosAnimados = ['animado', 'neon-glow', 'fire', 'resplandor', 'horror'];

    // Determinar si es un logo animado (GIF/Video)
    const esVideo = estilosAnimados.includes(estilo);

    await generarLogo(estilo, texto, m, conn, esVideo);
};

handler.help = ['logo'];
handler.tags = ['fun'];
handler.command = ['logo'];

export default handler;