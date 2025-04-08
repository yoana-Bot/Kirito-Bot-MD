import axios from 'axios';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        await conn.reply(m.chat, `${emoji} Por favor, proporciona una descripción para generar la imagen.`, m, rcanal);
        return;
    }

    const prompt = args.join(' ');
    const apiUrl = `https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${prompt}`;

    try {
        // Aquí se define el mensaje usando el prompt que el usuario proporciona
        await conn.reply(m.chat, `${emoji2} Generando imagen de ${prompt}`, m, rcanal);

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        await conn.sendMessage(
            m.chat, 
            { 
                image: Buffer.from(response.data), 
                caption: 'Tu imagen se generó con éxito' 
            }, 
            { quoted: fkontak }
        );
    } catch (error) {
        console.error('Error al generar la imagen:', error);
        await conn.reply(m.chat, `${msm} No se pudo generar la imagen, intenta nuevamente mas tarde.`, m, rcanal);
    }
};

handler.command = ['imgg', 'kiritoia'];
handler.help = ['imgg', 'kiritoia'];
handler.tags = ['tools'];

export default handler;