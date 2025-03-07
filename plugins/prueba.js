const handler = async (m, { command }) => {
  if (command === 'code') {
    m.reply('Uso correcto del comando:\n\n *.serbot --code*');
  }
};

handler.help = ['serbot', 'serbot code'];
handler.tags = ['serbot'];
handler.command = ['code'];

export default handler;

// Código creado por Deyin