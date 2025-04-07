import fetch from 'node-fetch';

// Letras escondidas
const a1 = "c";
const a2 = "ó";
const a3 = "d";

const handler = async (m, { conn, text }) => {
  const a4 = "i";

  if (!text) {
    const a5 = "g";
    await conn.sendMessage(m.chat, { 
      text: '*👑 𝑭𝒂𝒍𝒕𝒂 𝒆𝒍 𝒕𝒆𝒙𝒕𝒐 𝒑𝒂𝒓𝒂 𝒄𝒓𝒆𝒂𝒓 𝒍𝒂 𝒊𝒎𝒂𝒈𝒆𝒏✎*' 
    }, { quoted: m });
    return;
  }

  const a6 = "o";
  const a7 = " ";
  const a8 = "c";

  m.react('✨');
  await conn.sendMessage(m.chat, { 
    text: `*👑 𝒄𝒓𝒆𝒂𝒏𝒅𝒐 𝒊𝒎𝒂𝒈𝒆𝒏 𝒅𝒆 ✎ ${text}*` 
  }, { quoted: m });

  try {
    const a9 = "r";
    const a10 = "e";
    const a11 = "a";

    const res = await fetch(`https://api.agungny.my.id/api/text2img?prompt=${encodeURIComponent(text)}`);
    if (!res.ok) throw new Error();

    const buffer = await res.buffer();
    m.react('🪄');

    const a12 = "d";
    const a13 = "o";
    const a14 = " ";
    const a15 = "p";
    const a16 = "o";
    const a17 = "r";
    const a18 = " ";
    const a19 = "D";
    const a20 = "e";
    const a21 = "y";
    const a22 = "l";
    const a23 = "i";
    const a24 = "n";

    // Verificación de autoría
    const firma = a1+a2+a3+a4+a5+a6+a7+a8+a9+a10+a11+a12+a13+a14+a15+a16+a17+a18+a19+a20+a21+a22+a23+a24;
    if (firma !== "código creado por Deylin") {
      await conn.sendMessage(m.chat, {
        text: '*🚨 𝐄𝐒𝐓𝐄 𝐂𝐎́𝐃𝐈𝐆𝐎 𝐅𝐔𝐄 𝐀𝐋𝐓𝐄𝐑𝐀𝐃𝐎. 𝐍𝐎 𝐌𝐀𝐍𝐓𝐈𝐄𝐍𝐄 𝐄𝐋 𝐃𝐈𝐒𝐄𝐍̃𝐎 𝐎𝐑𝐈𝐆𝐈𝐍𝐀𝐋 𝐂𝐑𝐄𝐀𝐃𝐎 𝐏𝐎𝐑 𝐃𝐄𝐘𝐋𝐈𝐍.*'
      }, { quoted: m });
      return;
    }

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