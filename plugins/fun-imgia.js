import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.sendMessage(m.chat, { text: '*👑 𝑭𝒂𝒍𝒕𝒂 𝒆𝒍 𝒕𝒆𝒙𝒕𝒐 𝒑𝒂𝒓𝒂 𝒄𝒓𝒆𝒂𝒓 𝒍𝒂 𝒊𝒎𝒂𝒈𝒆𝒏✎*' }, { quoted: m });
    return;
  }

  m.react('✨');
  await conn.sendMessage(m.chat, { text: `*👑 𝒄𝒓𝒆𝒂𝒏𝒅𝒐 𝒊𝒎𝒂𝒈𝒆𝒏 𝒅𝒆 ✎ ${text}*` }, { quoted: m });

  try {
    const res = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(text)}`);
    if (!res.ok) throw new Error();

    const buffer = await res.buffer();
    m.react('🪄');
    await conn.sendMessage(m.chat, { 
      image: buffer, 
      caption: 'Imagen generada con éxito. Elige una opción:',
buttons: [
  {
    buttonId: '.imgg gato',
    buttonText: { displayText: '😻 Gato' },
  },
  {
    buttonId: '.imgg perro',
    buttonText: { displayText: '🐶 Perro' },
  },
  {
    buttonId: '.imgg raton',
    buttonText: { displayText: '🐁 Rata' },
  },
  {
    buttonId: '.imgg caballo',
    buttonText: { displayText: '🐎 Caballo' },
  },
  {
    buttonId: '.imgg vaca',
    buttonText: { displayText: '🐄 Vaca' },
  },
  {
    buttonId: '.imgg cabra',
    buttonText: { displayText: '🐐 Cabra' },
  },
  {
    buttonId: '.imgg oveja',
    buttonText: { displayText: '🐑 Oveja' },
  },
  {
    buttonId: '.imgg llama',
    buttonText: { displayText: '🦙 Llama' },
  },
  {
    buttonId: '.imgg guepardo',
    buttonText: { displayText: '🐆 Guepardo' },
  },
  {
    buttonId: '.imgg gorila',
    buttonText: { displayText: '🦍 Gorila' },
  },
  {
    buttonId: '.imgg rinoceronte',
    buttonText: { displayText: '🦏 Rinoceronte' },
  },
  {
    buttonId: '.imgg ardilla',
    buttonText: { displayText: '🐿️ Ardilla' },
  },
  {
    buttonId: '.imgg nutria',
    buttonText: { displayText: '🦦 Nutria' },
  },
  {
    buttonId: '.imgg pajaro',
    buttonText: { displayText: '🐤 Pájaro' },
  },
  {
    buttonId: '.imgg gallo',
    buttonText: { displayText: '🐓 Gallo' },
  },
],
      footer: '¡Disfruta!',
      viewOnce: true,
    }, { quoted: m });
  } catch (e) {
    await conn.sendMessage(m.chat, { text: '*🚨 Ha ocurrido un error 😔*' }, { quoted: m });
  }
};

handler.tags = ['tools'];
handler.help = ['genearimg'];
handler.command = ['imgIA', 'imgg', 'Imgia'];

export default handler;