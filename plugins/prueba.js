global.dfail = (type, m, usedPrefix, command, conn) => {
    let l = "https://files.catbox.moe/56el7x.jpg";
    let tex = "hola";
    
    conn.sendMessage(m.chat, { text: tex, image: { url: l } }, { quoted: m });
};

handler.command = ['l', 'tex'];
handler.tags = ['downloader'];