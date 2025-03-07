const handler = async (m, { command }) => {
  if (command === 'code') {
    m.reply('Uso correcto del comando: .serbot --code');
  }
};

handler.help = ['serbot'];
handler.tags = ['serbot'];
handler.command = ['code'];

export default handler;

// Código creado por Deyin