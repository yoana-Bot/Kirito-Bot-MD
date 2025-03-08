const handler = async (m, { command, conn }) => {
  if (command === 'platafor') {
conn.reply('*plataforma*\n\n https://deylinqff.github.io/mundo-bot', m, rcanal);
  }
};

handler.help = ['plataforma', 'platafor'];
handler.tags = ['serbot'];
handler.command = ['platafor'];

export default handler;

// Código creado por Deyin