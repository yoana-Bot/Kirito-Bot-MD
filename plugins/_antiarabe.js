let handler = m => m;

handler.before = async function (m, { conn }) {
  const prefijosProhibidos = ['91', '92', '222', '93', '265', '61', '62', '966', '229', '40', '49', '20', '963', '967', '234', '210', '249', '212'];
  const bot = global.db.data.settings[conn.user.jid] || {};
  const senderNumber = m.sender.split('@')[0];
  const user = global.db.data.users[m.sender];

  if (["120363297379773397@newsletter", "120363355261011910@newsletter"].includes(m.chat)) return;
  if (m.fromMe) return;
  if (!bot.anticommand) return;
  if (user.banned) return !1;
  const esProhibido = prefijosProhibidos.some(prefijo => senderNumber.startsWith(prefijo));
  if (esProhibido) {
    user.banned = true;
    if (m.chat.endsWith('@g.us')) {
      await conn.groupParticipantsUpdate(m.chat, [m.sender], 'remove');
    }
    await conn.updateBlockStatus(m.sender, 'block');
    return !1;
  }
  return !0;
};

export default handler;