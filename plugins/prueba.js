const handler = async (m, { command, conn }) => {
  if (command === 'code') {
    const texto = 'Uso correcto del comando: .serbot --code';

    const buttons = [
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
      }
    ];

    await conn.sendMessage(m.chat, { text: texto, buttons, footer: 'Código creado por Deyin' }, { quoted: m });
  }
};

handler.help = ['serbot', 'serbot code'];
handler.tags = ['serbot'];
handler.command = ['code'];

export default handler;

// Código creado por Deyin