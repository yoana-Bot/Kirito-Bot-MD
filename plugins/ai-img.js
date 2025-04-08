import axios from 'axios';

const handler = async (m, { conn, args }) => {
    if (!args[0]) {
        await conn.reply(m.chat, `${emoji} Por favor, proporciona una descripción para generar la imagen.`, m, rcanal);
        return;
    }

    const prompt = args.join(' ');
    const apiUrl = `https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${prompt}`;

    try {
        conn.reply(m.chat, `${emoji2} Espere un momento...

generando imagen de *${prompt}*`, m, rcanal);

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        await conn.sendMessage(m.chat, { image: Buffer.from(response.data) }, { quoted: m });
    } catch (error) {
        console.error('Error al generar la imagen:', error);
        await conn.reply(m.chat, ` No se pudo generar la imagen, intenta nuevamente mas tarde.`, m, rcanal);
    }
};

handler.command = ['imgg', 'kiritoia'];
handler.help = ['imgg <descripción>', 'kiritoia <descripción>'];
handler.tags = ['tools'];

export default handler;