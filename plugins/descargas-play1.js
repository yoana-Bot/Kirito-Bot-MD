import fetch from "node-fetch";
import yts from 'yt-search';
import axios from "axios";

const formatAudio = ['mp3', 'm4a', 'webm', 'acc', 'flac', 'opus', 'ogg', 'wav'];
const formatVideo = ['360', '480', '720', '1080', '1440', '4k'];

const ddownr = {
  download: async (url, format) => {
    if (!formatAudio.includes(format) && !formatVideo.includes(format)) {
      throw new Error('⚠️ Formato no soportado. Usa /play (audio) o /play2 (video).');
    }

    const apiUrl = `https://p.oceansaver.in/ajax/download.php?format=${format}&url=${encodeURIComponent(url)}&api=dfcb6d76f2f6a9894gjkege8a4ab232222`;
    
    try {
      const response = await axios.get(apiUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });

      if (response.data?.success) {
        const { id, title, info } = response.data;
        return {
          id,
          title,
          image: info.image,
          downloadUrl: await ddownr.cekProgress(id),
        };
      } else {
        throw new Error('⚠️ No se pudo obtener los detalles del video.');
      }
    } catch (error) {
      console.error('❌ Error en la descarga:', error.message);
      throw error;
    }
  },
  cekProgress: async (id) => {
    const progressUrl = `https://p.oceansaver.in/ajax/progress.php?id=${id}`;
    try {
      while (true) {
        const response = await axios.get(progressUrl, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        });

        if (response.data?.success && response.data.progress === 1000) {
          return response.data.download_url;
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
      }
    } catch (error) {
      console.error('❌ Error en el progreso de descarga:', error.message);
      throw error;
    }
  }
};

const handler = async (m, { conn, text, usedPrefix, command }) => {
  try {
    if (!text.trim()) {
      return conn.reply(m.chat, '⚠️ Ingresa el nombre de la música a descargar.', m);
    }

    const search = await yts(text);
    if (!search.all?.length) {
      return conn.reply(m.chat, '❌ No se encontraron resultados para tu búsqueda.', m);
    }

    const videoInfo = search.all[0];
    const { title, thumbnail, timestamp, views, ago, url } = videoInfo;
    const formattedViews = formatViews(views);

    const infoMessage = `🎶 *Descargando:* *${title}*\n\n📌 *Canal:* ${videoInfo.author.name || 'Desconocido'}\n👀 *Vistas:* ${formattedViews}\n⏳ *Duración:* ${timestamp}\n📅 *Publicado:* ${ago}\n🔗 *Link:* ${url}`;
    const thumb = (await conn.getFile(thumbnail))?.data;

    const JT = {
      contextInfo: {
        externalAdReply: {
          title: 'Kirito-Bot',
          body: 'By Deylin',
          mediaType: 1,
          previewType: 0,
          mediaUrl: url,
          sourceUrl: url,
          thumbnail: thumb,
          renderLargerThumbnail: true,
        },
      },
    };

    await conn.reply(m.chat, infoMessage, m, JT);

    if (command === 'play' || command === 'yta' || command === 'ytmp3') {
      try {
        const api = await ddownr.download(url, 'mp3');
        if (!api.downloadUrl) throw new Error('No se encontró un enlace de descarga válido.');

        await conn.sendMessage(m.chat, { 
          audio: { url: api.downloadUrl }, 
          mimetype: "audio/mpeg" 
        }, { quoted: m });
      } catch (error) {
        console.error('❌ Error en descarga MP3:', error.message);
        return conn.reply(m.chat, '⚠️ No se pudo descargar el audio.', m);
      }

    } else if (command === 'play2' || command === 'ytv' || command === 'ytmp4') {
      try {
        const apiUrl = `https://exonity.tech/api/dl/ytmp4?url=${url}&apikey=ex-290e8d524d`;
        const response = await fetch(apiUrl);
        const json = await response.json();

        if (!json.result?.dl) throw new Error('No se encontró un enlace de descarga válido.');

        await conn.sendMessage(m.chat, {
          video: { url: json.result.dl },
          fileName: `${title}.mp4`,
          mimetype: 'video/mp4',
          caption: '',
          thumbnail: thumb
        }, { quoted: m });

      } catch (error) {
        console.error('❌ Error en descarga MP4:', error.message);
        return conn.reply(m.chat, '⚠️ No se pudo descargar el video.', m);
      }
    } else {
      throw "⚠️ Comando no reconocido.";
    }
  } catch (error) {
    console.error('❌ Error general:', error.message);
    return conn.reply(m.chat, `⚠️ Ocurrió un error: ${error.message}`, m);
  }
};

handler.command = ['play', 'play2', 'ytmp3', 'yta', 'ytmp4', 'ytv'];
handler.tags = ['downloader'];
handler.group = true;
handler.register = true;

export default handler;

function formatViews(views) {
  if (views >= 1_000_000) return (views / 1_000_000).toFixed(1) + 'M (' + views.toLocaleString() + ')';
  if (views >= 1_000) return (views / 1_000).toFixed(1) + 'k (' + views.toLocaleString() + ')';
  return views.toString();
}