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
    const { url } = videoInfo;

    if (command === 'play' || command === 'yta' || command === 'ytmp3') {
      const api = await (await fetch(`https://api.neoxr.eu/api/youtube?url=${url}&type=audio&quality=128kbps&apikey=GataDios`)).json();
      const result = api.data.url;

      await conn.sendMessage(m.chat, { 
        audio: { url: result }, 
        mimetype: "audio/mpeg" 
      }, { quoted: m });

    } else if (command === 'play2' || command === 'ytv' || command === 'ytmp4') {
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

handler.command = ['ytmp3', 'yta', 'ytmp4', 'ytv'];
handler.tags = ['downloader'];
handler.group = true;

export default handler;