const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix.toLowerCase() === 'a') return;

  const customEmoji = global.db?.data?.chats?.[m.chat]?.customEmoji || '🔥';
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    return;
  }

  const countryFlags = {
    "1": "🇺🇸", "7": "🇷🇺", "20": "🇪🇬", "27": "🇿🇦", "30": "🇬🇷", "31": "🇳🇱",
    "32": "🇧🇪", "33": "🇫🇷", "34": "🇪🇸", "36": "🇭🇺", "39": "🇮🇹", "40": "🇷🇴",
    "41": "🇨🇭", "43": "🇦🇹", "44": "🇬🇧", "45": "🇩🇰", "46": "🇸🇪", "47": "🇳🇴",
    "48": "🇵🇱", "49": "🇩🇪", "51": "🇵🇪", "52": "🇲🇽", "53": "🇨🇺", "54": "🇦🇷",
    "55": "🇧🇷", "56": "🇨🇱", "57": "🇨🇴", "58": "🇻🇪", "504": "🇭🇳"
  };

  function getPrefix(number) {
    for (let i = 4; i >= 1; i--) {
      const sub = number.slice(0, i);
      if (countryFlags[sub]) return sub;
    }
    return "1"; // Si no encuentra, usa EE.UU. por defecto
  }

  const mensaje = args.join(' ') || '¡Todos mencionados!';
  let teks = `*!  MENCION GENERAL  !*\n*PARA ${participants.length} MIEMBROS* ⚡\n\n${mensaje}\n\n`;

  for (const mem of participants) {
    const number = mem.id.split('@')[0];
    const prefix = getPrefix(number);
    const flag = countryFlags[prefix] || "🏳️‍🌈";
    teks += `┃ ${flag} @${number}\n`;
  }

  teks += `\n┗━ ${botname || "Bot"} ━`;

  conn.sendMessage(m.chat, { text: teks, mentions: participants.map(p => p.id) }, { quoted: m });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['group'];
handler.command = ['todos', 'invocar', 'tagall'];
handler.group = true;

export default handler;