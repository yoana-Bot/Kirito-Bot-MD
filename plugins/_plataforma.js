const handler = async (m, { command }) => {
  if (command === 'platafor') {
    m.reply('*plataforma*\n\n https://deylinqff.github.io/mundo-bot');
  }
};

handler.help = ['plataforma', 'platafor'];
handler.tags = ['serbot'];
handler.command = ['platafor'];

export default handler;

// Código creado por Deyin