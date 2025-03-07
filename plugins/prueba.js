const handler = async (m, { command }) => {
  if (command === 'code') {
    m.reply('Uso correcto del comando:\n\n *.serbot --code*');
  }
};
      buttons: [
        {
          buttonId: '.imgg gato',
          buttonText: { displayText: '😻 Gato' },
        },
        {
          buttonId: '.imgg perro',
          buttonText: { displayText: '🐶 Perro' },
        },
        {
          buttonId: '.imgg raton',
          buttonText: { displayText: '🐁 Rata' },
        },
        {
          buttonId: '.imgg caballo',
          buttonText: { displayText: '🐎 Caballo' },
        },
      ],

handler.help = ['serbot', 'serbot code'];
handler.tags = ['serbot'];
handler.command = ['code'];

export default handler;

// Código creado por Deyin