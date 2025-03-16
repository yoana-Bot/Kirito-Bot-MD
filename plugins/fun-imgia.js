import fetch from 'node-fetch';

const handler = async (m, { conn, text }) => {
  if (!text) {
    await conn.sendMessage(m.chat, { 
      text: '*👑 𝑭𝒂𝒍𝒕𝒂 𝒆𝒍 𝒕𝒆𝒙𝒕𝒐 𝒑𝒂𝒓𝒂 𝒄𝒓𝒆𝒂𝒓 𝒍𝒂 𝒊𝒎𝒂𝒈𝒆𝒏✎*' 
    }, { quoted: m });
    return;
  }

  m.react('✨');
  await conn.sendMessage(m.chat, { 
    text: `*👑 𝒄𝒓𝒆𝒂𝒏𝒅𝒐 𝒊𝒎𝒂𝒈𝒆𝒏 𝒅𝒆 ✎ ${text}*` 
  }, { quoted: m });

  try {
    const res = await fetch(`https://eliasar-yt-api.vercel.app/api/ai/text2img?prompt=${encodeURIComponent(text)}`);
    if (!res.ok) throw new Error();

    const buffer = await res.buffer();
    m.react('🪄');
    
    await conn.sendMessage(m.chat, { 
      image: buffer, 
      caption: '*👑 𝑰𝒎𝒂𝒈𝒆𝒏 𝒈𝒆𝒏𝒆𝒓𝒂𝒅𝒂 𝒄𝒐𝒏 é𝒙𝒊𝒕𝒐 ✅*'
    }, { quoted: m });

  } catch (e) {
    await conn.sendMessage(m.chat, { 
      text: '*🚨 𝑯𝒂 𝒐𝒄𝒖𝒓𝒓𝒊𝒅𝒐 𝒖𝒏 𝒆𝒓𝒓𝒐𝒓 😔*' 
    }, { quoted: m });
  }
};

handler.tags = ['tools'];
handler.help = ['genearimg'];
handler.command = ['imgIA', 'imgg', 'Imgia'];

export default handler;