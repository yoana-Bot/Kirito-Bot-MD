import axios from 'axios';

const handler = async (m, { conn, args, command }) => {
    const kiritoLogo = '☯️ KIRITO-BOT | IA ☯️';
    const waitMessage = '⌛ Generando tu imagen...';
    const errorMessage = '❌ No se pudo generar la imagen. Intenta más tarde.';
    const usageMessage = '✏️ Por favor, proporciona una descripción para generar la imagen.\n\n*Ejemplo:* .imgg un dragón volando sobre un castillo';

    if (!args[0]) {
        await conn.reply(m.chat, `${kiritoLogo}\n\n${usageMessage}`, m, rcanal);
        return;
    }

    const prompt = args.join(' ');
    const apiUrl = `https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(prompt)}`;

    try {
        await conn.reply(m.chat, `${kiritoLogo}\n\n${waitMessage}`, m, rcanal);

        const response = await axios.get(apiUrl, { responseType: 'arraybuffer' });

        await conn.sendMessage(
            m.chat,
            {
                image: Buffer.from(response.data),
                caption: `${kiritoLogo}\n\n✨ Prompt usado:\n${prompt}`,
            },
            { quoted: fkontak }
        );
    } catch (error) {
        console.error('[KIRITO-IMG-ERROR]:', error);
        await conn.reply(m.chat, `${kiritoLogo}\n\n${errorMessage}`, m, rcanal);
    }
};

handler.command = ['imgg', 'kiritoia'];
handler.help = ['imgg <descripción>', 'kiritoia <descripción>'];
handler.tags = ['tools'];

export default handler;