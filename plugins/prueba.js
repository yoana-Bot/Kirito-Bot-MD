import fetch from "node-fetch";
import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `Ingresa el nombre de la música a descargar.`, m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados.');
    }

    const videoInfo = search.all[0];
    const { url, thumbnail } = videoInfo;

    if (command === 'ytmp3' || command === 'udiv') {
      const api = await (await fetch(`https://api.neoxr.eu/api/youtube?url=${url}&type=audio&quality=128kbps&apikey=GataDios`)).json();
      const result = api.data.url;

      // Descarga la miniatura del video
      const thumbBuffer = await (await fetch(thumbnail)).buffer();

      await conn.sendMessage(m.chat, { 
        audio: { url: result }, 
        mimetype: "audio/mpeg",
        ptt: false, // Si quieres que se envíe como audio normal y no nota de voz
        jpegThumbnail: thumbBuffer // Agrega la miniatura al audio
      }, { quoted: m });

    } else if (command === 'ytmp4' || command === 'vids') {
      const response = await fetch(`https://api.neoxr.eu/api/youtube?url=${url}&type=video&quality=480p&apikey=GataDios`);
      const json = await response.json();

      await conn.sendMessage(m.chat, {
        video: { url: json.data.url },
        fileName: json.data.filename,
        mimetype: 'video/mp4'
      }, { quoted: m });
    }
  } catch (error) {
    return m.reply(`⚠︎ Error: ${error.message}`);
  }
};

handler.command = ['ytmp3', 'udiv', 'ytmp4', 'vids'];
handler.tags = ['downloader'];
handler.group = true;

export default handler;