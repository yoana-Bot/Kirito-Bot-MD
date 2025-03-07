const handler = async (m, { command }) => {
  if (command === 'platafor') {
    m.reply('*plataforma*\n\n https://deylinqff.github.io/mundo-bot');
  }
};

handler.help = ['serbot', 'serbot code'];
handler.tags = ['serbot'];
handler.command = ['platafor'];

export default handler;

// Código creado por Deyin