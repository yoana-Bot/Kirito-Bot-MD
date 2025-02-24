import axios from 'axios';
import cheerio from 'cheerio';
import qs from 'qs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
  if (!text) {
    return m.reply(`Ejemplo de uso: *${usedPrefix + command} nose como paso*`);
  }

  const appleMusic = {
    search: async (query) => {
      const url = `https://music.apple.com/us/search?term=${query}`;
      try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const results = [];
        $('.desktop-search-page .section[data-testid="section-container"] .grid-item').each((_, element) => {
          const title = $(element).find('.top-search-lockup__primary__title').text().trim();
          const subtitle = $(element).find('.top-search-lockup__secondary').text().trim();
          const link = $(element).find('.click-action').attr('href');
          results.push({ title, subtitle, link });
        });
        return results;
      } catch {
        return [];
      }
    }
  };

  const appledown = {
    download: async (url) => {
      try {
        const { data } = await axios.get(`https://aaplmusicdownloader.com/api/applesearch.php?url=${url}`);
        if (!data || !data.name) return null;
        return {
          name: data.name,
          album: data.albumname,
          artist: data.artist,
          thumb: data.thumb,
          duration: data.duration,
          download: data.url
        };
      } catch {
        return null;
      }
    }
  };

  conn.sendMessage(m.chat, { react: { text: "🕒", key: m.key } });

  const searchResults = await appleMusic.search(text);
  if (!searchResults.length) return m.reply("No se encontraron resultados.");

  const musicData = await appledown.download(searchResults[0].link);
  if (!musicData) return m.reply("No se pudo descargar la música.");

  const { name, album, artist, thumb, duration, download } = musicData;

  await conn.sendMessage(m.chat, {
    image: { url: thumb },
    caption: `🎵 *${name}*  
📀 *Álbum:* ${album}  
👤 *Artista:* ${artist}  
⏳ *Duración:* ${duration}`
  });

  await conn.sendMessage(m.chat, {
    audio: { url: download },
    mimetype: 'audio/mp4',
    fileName: `${name}.mp3`
  });

  await conn.sendMessage(m.chat, { react: { text: '✅', key: m.key } });
};

handler.help = ['play'];
handler.tags = ['downloader'];
handler.command = /^(applemusicplay|play|song)$/i;

export default handler;