import yts from 'yt-search';

const handler = async (m, { conn, text, command }) => {
  if (!text) throw '⚠️ Ingresa el nombre de la música que deseas descargar.';

  const isVideo = /vid|2|mp4|v$/.test(command);
  const search = await yts(text);

  if (!search.all || search.all.length === 0) {
    throw "❌ No se encontraron resultados para tu búsqueda.";
  }

  const videoInfo = search.all[0];
  const body = `🎵 *Descargando:* *${videoInfo.title}*\n\n` +
    `📺 *Canal:* ${videoInfo.author.name || 'Desconocido'}\n` +
    `👁️ *Vistas:* ${videoInfo.views}\n` +
    `⏳ *Duración:* ${videoInfo.timestamp}\n` +
    `📅 *Publicado:* ${videoInfo.ago}\n` +
    `🔗 *Link:* ${videoInfo.url}`;

  if (command.startsWith('play')) {
    await conn.sendMessage(m.chat, {
      image: { url: videoInfo.thumbnail },
      caption: body,
      footer: 'Kirito-Bot',
      buttons: [
        { buttonId: `.yta ${videoInfo.url}`, buttonText: { displayText: '🎧 Audio' }, type: 1 },
        { buttonId: `.ytv ${videoInfo.url}`, buttonText: { displayText: '🎬 Video' }, type: 1 }
      ],
      headerType: 4
    }, { quoted: m });

    return m.react('⏳');
  }

  if (command.startsWith('yta') || command.startsWith('ytmp3')) {
    return await downloadMedia(m, conn, videoInfo.url, 'mp3');
  }

  if (command.startsWith('ytv') || command.startsWith('ytmp4')) {
    return await downloadMedia(m, conn, videoInfo.url, 'mp4');
  }

  throw '❌ Comando no reconocido.';
};

const downloadMedia = async (m, conn, url, type) => {
  m.react('⏳');
  const apis = [
    `https://api.alyachan.dev/api/youtube?url=${url}&type=${type}&apikey=Gata-Dios`,
    `https://delirius-apiofc.vercel.app/download/yt${type}?url=${url}`,
    `https://api.vreden.my.id/api/yt${type}?url=${url}`
  ];

  for (let api of apis) {
    try {
      const response = await fetch(api);
      const data = await response.json();
      if (data?.data?.url) {
        if (type === 'mp3') {
          return conn.sendFile(m.chat, data.data.url, 'audio.mp3', '', m, null, { mimetype: 'audio/mpeg' });
        } else {
          return conn.sendMessage(m.chat, { video: { url: data.data.url }, mimetype: 'video/mp4' }, { quoted: m });
        }
      }
    } catch (error) {
      continue;
    }
  }

  throw `❌ No se pudo obtener el ${type === 'mp3' ? 'audio' : 'video'}.`;
};

handler.help = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.command = ['play', 'playvid', 'ytv', 'ytmp4', 'yta', 'play2', 'ytmp3'];
handler.tags = ['descargas'];
handler.register = true;

export default handler;

const getVideoId = (url) => {
  const regex = /(?:v=|\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  if (match) {
    return match[1];
  }
  throw new Error("Invalid YouTube URL");
};