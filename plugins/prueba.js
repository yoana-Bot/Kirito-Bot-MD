const handler = async (m, { command, conn }) => {
  if (command === 'code') {
    const texto = 'Uso correcto del comando:\n\n*.serbot --code*';

    const buttons = [
      {
        buttonId: '.serbot --code',
        buttonText: { displayText: '📋 Copiar Código' },
      }
    ];

    await conn.sendMessage(m.chat, { text: texto, buttons, footer: 'Código creado por Deyin' }, { quoted: m });
  }
};

handler.help = ['serbot'];
handler.tags = ['serbot'];
handler.command = ['code'];

export default handler;

// Código creado por Deyin