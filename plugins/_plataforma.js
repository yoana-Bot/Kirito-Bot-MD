const handler = async (m, { command, conn }) => {
  if (command === 'platafor') {
conn.reply(m.chat, '*plataforma*\n\n https://deylinqff.github.io/mundo-bot', m, fake);
  }
};

handler.help = ['plataforma', 'platafor'];
handler.tags = ['serbot'];
handler.command = ['platafor'];

export default handler;