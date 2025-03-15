const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🔥';
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  // Diccionario de banderas por prefijo telefónico
  const countryFlags = {
    "1": "🇺🇸", "52": "🇲🇽", "54": "🇦🇷", "55": "🇧🇷", "57": "🇨🇴", "58": "🇻🇪",
    "34": "🇪🇸", "51": "🇵🇪", "56": "🇨🇱", "591": "🇧🇴", "593": "🇪🇨", "502": "🇬🇹",
    "503": "🇸🇻", "504": "🇭🇳", "505": "🇳🇮", "506": "🇨🇷", "507": "🇵🇦", "592": "🇬🇾",
    "594": "🇫🇷", "595": "🇵🇾", "596": "🇲🇶", "597": "🇸🇷", "598": "🇺🇾", "599": "🇨🇼"
  };

  const pesan = args.join` `;
  const oi = `*» INFO :* ${pesan}`;
  let teks = `*!  MENCION GENERAL  !*\n  *PARA ${participants.length} MIEMBROS* ⚡\n\n ${oi}\n\n┏╍┅┅╍┅╍=͟͟͞${botname} ╍┅╍┅┅╍╍╍☾\n`;
  
  for (const mem of participants) {
    const number = mem.id.split('@')[0];
    const prefix = number.slice(0, number.length - 8); // Extrae el prefijo del número
    const flag = countryFlags[prefix] || "🌐"; // Usa la bandera si existe, si no, pone una neutral
    teks += `┃⏤͟͟͞͞${flag} @${number}\n`;
  }

  teks += `┗┅╍╍┅╍┅ *${vs}* ╍┅╍┅┅╍┅☾`;

  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['group'];
handler.command = ['todos', 'invocar', 'tagall'];
handler.admin = true;
handler.group = true;

export default handler;