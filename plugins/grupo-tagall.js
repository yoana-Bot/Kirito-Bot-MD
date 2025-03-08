const handler = async (m, { isOwner, isAdmin, conn, text, participants, args, command, usedPrefix }) => {
  if (usedPrefix == 'a' || usedPrefix == 'A') return;

  const customEmoji = global.db.data.chats[m.chat]?.customEmoji || '🔥';
  m.react(customEmoji);

  if (!(isAdmin || isOwner)) {
    global.dfail('admin', m, conn);
    throw false;
  }

  const emojis = [
    "😀", "😃", "😄", "😁", "😆", "😅", "😂", "🤣", "😭", "😉", "😗", "😙", "😚", "😘", "🥰", "😍", "🤩", "🥳", "🫠", "🙂", "😔", "🫡", "🤨", "😞", "🙃", "😏", "🥺", "🤔", "🧐", "😓", "🤤", "😬", "🤫", "😒", "😟", "🥲", "😋", "😑", "🫢", "🙄", "😥", "😦", "🥹", "😛", "😐", "🤭", "😮", "😢", "😊", "😝", "😶", "🥱", "😤", "☹️", "😯", "☺️", "😜", "🤗", "😠", "🙁", "😲", "😌", "🤪", "🫥", "🫣", "😡", "😳", "🫤", "🥴", "🤐", "😱", "🤬", "😕", "🤯", "😲", "😯", "😦", "😧", "😨", "😰", "😖", "🤢", "😇", "😣", "🤮", "🤠", "😩", "🤑", "😴", "😫", "😪", "🤓", "😵", "🤧", "😎", "😵‍💫", "🤒", "🥸", "🫨", "🤕", "🥶", "😷", "🥵", "🤥"
  ];

  const pesan = args.join` `;
  const oi = `*» INFO :* ${pesan}`;
  let teks = `*!  MENCION GENERAL  !*\n  *PARA ${participants.length} MIEMBROS* ⚡\n\n ${oi}\n\n┏╍┅┅╍┅╍=͟͟͞${botname} ╍┅╍┅┅╍╍╍☾\n`;
  for (const mem of participants) {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    teks += `┃⏤͟͟͞͞ꗄ➺ ${emoji} @${mem.id.split('@')[0]}\n`;
  }
  teks += `┗┅╍╍┅╍┅ *${vs}* ╍┅╍┅┅╍┅☾`;

  conn.sendMessage(m.chat, { text: teks, mentions: participants.map((a) => a.id) });
};

handler.help = ['todos *<mensaje opcional>*'];
handler.tags = ['group'];
handler.command = ['todos', 'invocar', 'tagall']
handler.admin = true;
handler.group = true;

export default handler;