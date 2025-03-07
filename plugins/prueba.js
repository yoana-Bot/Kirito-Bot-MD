const handler = async (m, { command, conn }) => {
  if (command === 'code') {
    const texto = 'Uso correcto del comando:\n\n*.serbot --code*';

    const buttons = [
      { buttonId: '.serbot --code', buttonText: { displayText: '📋 Copiar Código' }, type: 1 }
    ];

    const buttonMessage = {
      text: texto,
      footer: 'Código creado por Deyin',
      buttons: buttons,
      headerType: 1
    };

    await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
  }
};

handler.help = ['serbot'];
handler.tags = ['serbot'];
handler.command = ['code'];

export default handler;

// Código creado por Deyin