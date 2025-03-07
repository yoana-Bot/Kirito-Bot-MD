import fetch from 'node-fetch';

const handler = async (m, { command, conn, text }) => {
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

    await conn.sendMessage(m.chat, { 
      text: texto, 
      buttons: buttons, 
      footer: 'Código creado por Deyin' 
    }, { quoted: m });
  }
};

handler.tags = ['serbot'];
handler.help = ['serbot', 'serbot code'];
handler.command = ['code'];

export default handler;

// Código creado por Deyin