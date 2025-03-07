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

    let userId = m.sender; // ID del usuario que envió el mensaje

    await conn.sendMessage(m.chat, { 
      image: buffer, 
      caption: 'Imagen generada con éxito.',
      buttons: [
        {
          buttonId: `.perfil ${userId}`, // Botón de perfil con ID del usuario
          buttonText: { displayText: '👤 Perfil' },
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
handler.command = ['imgIA', 'imgg2', 'Imgia'];

export default handler;