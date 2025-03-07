const handler = async (m, { conn }) => {
  let name = m.pushName || "Usuario";
  let userId = m.sender;

  let regbot = `╓════════════════════════════╖\n`;
  regbot += `║    👑 *REGISTRO COMPLETADO*     ║\n`;
  regbot += `╙════════════════════════════╜\n\n`;
  regbot += `─────── 📌 *Información* ───────\n`;
  regbot += `• 👤 *Nombre:* ${name}\n`;
  regbot += `• 🆔 *ID:* ${userId}\n\n`;
  regbot += `─────── 🎁 *Recompensas* ───────\n`;
  regbot += `• 💰 *Monedas:* 40\n`;
  regbot += `• ⭐ *Experiencia:* 300\n`;
  regbot += `• 🎟 *Tokens:* 20\n\n`;
  regbot += `✨ *¡Bienvenido a nuestro sistema!* ✨`;

  let buttons = [
    {
      buttonId: `.perfil ${userId}`,
      buttonText: { displayText: '👤 Perfil' },
    },
  ];

  await conn.sendMessage(m.chat, { text: regbot, buttons, footer: 'Sistema Kirito-Bot' }, { quoted: m });
};

handler.command = ['registro'];
export default handler;