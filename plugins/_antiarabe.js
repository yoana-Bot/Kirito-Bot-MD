let handler = async (event, { conn }) => {
  const prefijosProhibidos = ['91', '92', '222', '93', '265', '61', '62', '966', '229', '40', '49', '20', '963', '967', '234', '210', '249', '212'];
  const bot = global.db.data.settings[conn.user.jid] || {};

  if (!bot.anticommand) return;

  for (const participant of event.participants) {
    const number = participant.split('@')[0];
    const isBannedPrefix = prefijosProhibidos.some(prefijo => number.startsWith(prefijo));
    const user = global.db.data.users[participant] || {};

    if (event.action === 'add' && isBannedPrefix) {
      user.banned = true;

      
      await conn.sendMessage(event.id, {
        text: `⚠️ @${number} ha sido eliminado por tener un prefijo no permitido.`,
        mentions: [participant]
      });

      
      await conn.groupParticipantsUpdate(event.id, [participant], 'remove');
      await conn.updateBlockStatus(participant, 'block');
    }
  }
};

handler.event = 'group-participants-update';

export default handler;