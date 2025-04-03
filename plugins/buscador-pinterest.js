import axios from 'axios';
import baileys from '@whiskeysockets/baileys';

async function sendAlbumMessage(jid, medias, options = {}) {
    if (typeof jid !== "string") {
        throw new TypeError(`jid must be string, received: ${jid} (${jid?.constructor?.name})`);
    }

    for (const media of medias) {
        if (!media.type || (media.type !== "image" && media.type !== "video")) {
            throw new TypeError(`media.type must be "image" or "video", received: ${media.type}`);
        }
        if (!media.data || (!media.data.url && !Buffer.isBuffer(media.data))) {
            throw new TypeError(`media.data must have a url or buffer, received: ${media.data}`);
        }
    }

    if (medias.length < 2) {
        throw new RangeError("Minimum 2 media");
    }

    const caption = options.text || options.caption || "";

    const album = baileys.generateWAMessageFromContent(
        jid,
        {
            messageContextInfo: {},
            albumMessage: { expectedImageCount: medias.length },
        },
        {}
    );

    await conn.relayMessage(album.key.remoteJid, album.message, { messageId: album.key.id });

    const messages = await Promise.all(
        medias.map(async (media, index) => {
            const img = await baileys.generateWAMessage(
                album.key.remoteJid,
                { [media.type]: media.data, ...(index === 0 ? { caption } : {}) },
                { upload: conn.waUploadToServer }
            );

            img.message.messageContextInfo = {
                messageAssociation: { associationType: 1, parentMessageKey: album.key },
            };

            return img;
        })
    );

    for (const msg of messages) {
        await conn.relayMessage(msg.key.remoteJid, msg.message, { messageId: msg.key.id });
    }

    return album;
}

const pins = async (judul) => {
    const link = `https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(judul)}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22applied_unified_filters%22%3Anull%2C%22appliedProductFilters%22%3A%22---%22%2C%22article%22%3Anull%2C%22auto_correction_disabled%22%3Afalse%2C%22corpus%22%3Anull%2C%22customized_rerank_type%22%3Anull%2C%22domains%22%3Anull%2C%22dynamicPageSizeExpGroup%22%3A%22control%22%2C%22filters%22%3Anull%2C%22journey_depth%22%3Anull%2C%22page_size%22%3Anull%2C%22price_max%22%3Anull%2C%22price_min%22%3Anull%2C%22query_pin_sigs%22%3Anull%2C%22query%22%3A%22${encodeURIComponent(judul)}%22%2C%22redux_normalize_feed%22%3Atrue%2C%22request_params%22%3Anull%2C%22rs%22%3A%22typed%22%2C%22scope%22%3A%22pins%22%2C%22selected_one_bar_modules%22%3Anull%2C%22seoDrawerEnabled%22%3Afalse%2C%22source_id%22%3Anull%2C%22source_module_id%22%3Anull%2C%22source_url%22%3A%22%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(judul)}%26rs%3Dtyped%22%2C%22top_pin_id%22%3Anull%2C%22top_pin_ids%22%3Anull%7D%2C%22context%22%3A%7B%7D%7D`;

    const headers = { /* Encabezados de la solicitud a Pinterest */ };

    try {
        const res = await axios.get(link, { headers });
        if (res.data?.resource_response?.data?.results) {
            return res.data.resource_response.data.results
                .map(item => item.images ? {
                    image_large_url: item.images.orig?.url || null,
                    image_medium_url: item.images['564x']?.url || null,
                    image_small_url: item.images['236x']?.url || null
                } : null)
                .filter(img => img !== null);
        }
        return [];
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

let handler = async (m, { conn, text }) => {
    if (!text) {
        return m.reply("Ingresa un texto. Ejemplo: .pinterest kirito");
    }

    try {
        m.react('🕒');

        const results = await pins(text);
        if (!results || results.length === 0) {
            return conn.reply(m.chat, `No se encontraron resultados para "${text}".`, m);
        }

        const maxImages = Math.min(results.length, 10);
        const medias = results.slice(0, maxImages).map(result => ({
            type: 'image',
            data: { url: result.image_large_url || result.image_medium_url || result.image_small_url }
        }));

        await sendAlbumMessage(m.chat, medias, {
            caption: `*Pinterest Search Image*\n\n` +
                `• *Búsqueda:* "${text}"\n` +
                `• *Tipo:* Imágenes\n` +
                `• *Resultados:* ${maxImages}\n` +
                `• *Fuente:* Pinterest\n\n` +
                `_BUILD WITH TYLARZ © 2019-2025_`,
            quoted: m
        });

        await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });

    } catch (error) {
        console.error(error);
        conn.reply(m.chat, 'Error al obtener imágenes de Pinterest.', m);
    }
};

handler.help = ['pinterest'];
handler.command = ['pinterest', 'pin'];
handler.tags = ['buscador'];

export default handler;