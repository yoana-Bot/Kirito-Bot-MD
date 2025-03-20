import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, `┌─⟢ *DESCARGA DE MÚSICA* ⟣─┐\n│\n│ ✦ Ingresa el nombre de la música a descargar.\n│\n└────────────────────┘`, m);
    }

    const search = await yts(text);
    if (!search.all || search.all.length === 0) {
      return m.reply('No se encontraron resultados para tu búsqueda.');
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const vistas = formatViews(views);

    const infoMessage = `★ *𝗞𝗜𝗥𝗜𝗧𝗢 - 𝗕𝗢𝗧 𝗠𝗗* ★  

✦ *Archivo encontrado:* *「 ${title} 」*  

⚔ *Canal:* » *${videoInfo.author.name || 'Desconocido'}*  
◆━━━━━━◆✦◆━━━━━━◆  
⚔ *Vistas:* » *${vistas}*  
◆━━━━━━◆✦◆━━━━━━◆  
⚔ *Duración:* » *${timestamp}*  
◆━━━━━━◆✦◆━━━━━━◆  
⚔ *Publicado:* » *${ago}*  
◆━━━━━━◆✦◆━━━━━━◆  
⚔ *Enlace:* » ${url}`;

    const thumb = (await conn.getFile(thumbnail))?.data;

    await conn.sendMessage(m.chat, { 
      image: { url: thumbnail },
      caption: infoMessage
    }, { quoted: m });

    if (command === 'pl' || command === 'yta' || command === 'ytmp3') {
      const api = await (await fetch(`https://api.neoxr.eu/api/youtube?url=${url}&type=audio&quality=128kbps&apikey=GataDios`)).json();
      const result = api.data.url;

      const doc = {
        audio: { url: result },
        mimetype: 'audio/mp4',
        fileName: `${title}.mp3`,
        contextInfo: {
          externalAdReply: {
            showAdAttribution: true,
            mediaType: 2,
            mediaUrl: url,
            title: title,
            sourceUrl: url,
            thumbnail: thumb
          }
        }
      };

      await conn.sendMessage(m.chat, doc, { quoted: m });

    } else if (command === 'pla' || command === 'ytv' || command === 'ytmp4') {

      const response = await fetch(`https://api.neoxr.eu/api/youtube?url=${url}&type=video&quality=480p&apikey=GataDios`);
      const json = await response.json();

      try {
        await conn.sendMessage(m.chat, {
          video: { url: json.data.url },
          fileName: json.data.filename,
          mimetype: 'video/mp4',
          caption: '',
          thumbnail: json.thumbnail || null
        }, { quoted: m });
      } catch (e) {
        console.error(`Error con la fuente de descarga:`, e.message);
      }

    } else {
      throw new Error("Comando no reconocido.");
    }
  } catch (error) {
    return m.reply(`⚠︎ Ocurrió un error: ${error.message}`);
  }
};

handler.command = handler.help = ['pl', 'pla', 'ytmp3', 'yta', 'ytmp4', 'ytv'];
handler.tags = ['downloader'];
handler.group = true;

export default handler;

function formatViews(views) {
  if (views >= 1000) {
    return (views / 1000).toFixed(1) + 'k (' + views.toLocaleString() + ')';
  } else {
    return views.toString();
  }
}