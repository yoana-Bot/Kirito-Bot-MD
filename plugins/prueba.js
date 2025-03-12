import { createCanvas, loadImage } from 'canvas';
import fs from 'fs';
import path from 'path';

// Función para generar el logo con texto y una imagen
async function generarLogoImagen(texto, imagenURL, m, conn) {
    try {
        const ancho = 500;
        const alto = 300;

        console.log('Creando lienzo...');

        // Crear lienzo y contexto de dibujo
        const canvas = createCanvas(ancho, alto);
        const ctx = canvas.getContext('2d');

        // Verificar si la URL de la imagen es válida
        if (!/^https?:\/\//.test(imagenURL)) {
            console.log('URL no válida:', imagenURL);
            return conn.sendMessage(m.chat, { 
                text: '❌ La URL de la imagen no es válida. Asegúrate de que la URL empiece con http:// o https://' 
            }, { quoted: m });
        }

        console.log('Cargando imagen desde:', imagenURL);
        const imagen = await loadImage(imagenURL);

        // Dibujar la imagen en el lienzo
        ctx.drawImage(imagen, 0, 0, ancho, alto);

        console.log('Dibujando texto en la imagen...');

        // Estilo del texto
        ctx.font = 'bold 40px Arial';
        ctx.fillStyle = 'white';
        ctx.textAlign = 'center';
        ctx.fillText(texto, ancho / 2, alto / 2);

        // Asegurarse de que la carpeta 'temp' exista
        const tempDir = './temp';
        if (!fs.existsSync(tempDir)) {
            fs.mkdirSync(tempDir);
        }

        // Guardar la imagen generada en formato PNG
        const buffer = canvas.toBuffer('image/png');
        const filePath = path.join(tempDir, 'logo.png');
        fs.writeFileSync(filePath, buffer);

        console.log('Enviando imagen...');

        // Enviar la imagen generada al chat
        await conn.sendMessage(m.chat, { 
            image: fs.readFileSync(filePath), 
            caption: `Aquí tienes tu logo con imagen y texto: *${texto}*`
        }, { quoted: m });

    } catch (error) {
        console.error('Error al generar el logo:', error);
        await conn.sendMessage(m.chat, { 
            text: '❌ Error al generar el logo. Intenta de nuevo.' 
        }, { quoted: m });
    }
}

// Handler para el comando del bot
const handler = async (m, { conn, args }) => {
    console.log('Handler para /logopic ejecutado.');

    if (!args || args.length < 2) {
        return conn.sendMessage(m.chat, { 
            text: '❌ Uso incorrecto. Ejemplo: /logopic Kirito-Bot https://imagen.com/kirito.jpg' 
        }, { quoted: m });
    }

    const texto = args.slice(0, -1).join(' ');  // Texto antes de la URL
    const imagenURL = args[args.length - 1];  // URL de la imagen

    console.log('Comando recibido:', texto, imagenURL);

    // Llamar a la función para generar el logo
    await generarLogoImagen(texto, imagenURL, m, conn);
};

// Definición de los metadatos del comando
handler.help = ['logopic'];
handler.tags = ['fun'];
handler.command = /^logopic$/i;

export default handler;