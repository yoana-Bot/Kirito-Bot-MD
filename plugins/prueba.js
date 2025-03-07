const handler = async (m, { command, conn }) => {
  if (command === 'code') {
    const texto = 'Uso correcto del comando:\n\n*.serbot --code*';
    const button = {
      buttonText: { displayText: '📋 Copiar Código' },
      description: texto,
      sections: [{ rows: [{ title: '.serbot --code', id: '.serbot --code' }] }]
    };
    await conn.sendMessage(m.chat, button, { quoted: m });
  }
};

handler.help = ['serbot'];
handler.tags = ['serbot'];
handler.command = ['code'];

export default handler;

// Código creado por Deyin