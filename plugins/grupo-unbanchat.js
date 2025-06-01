let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (!(m.chat in global.db.data.chats)) 
    return conn.reply(m.chat, '🔴 *¡ESTE CHAT NO ESTÁ REGISTRADO!*', m, rcanal);

  let chat = global.db.data.chats[m.chat];

  if (command === 'vegeta') {
    if (args.length === 0) {
      const estado = chat.isBanned ? '⚠️ *DESACTIVADO*' : '✅ *ACTIVADO*';
      const info = `👑 *VEGETA-BOT2.0 CONTROL*  
╭━━━━━━━━━━━━━╮  
┃ *🔥 COMANDOS DISPONIBLES:*  
┃ ✦ *${usedPrefix}vegeta on* – ⚡ 𝗔𝗰𝘁𝗶𝘃𝗮𝗿  
┃ ✦ *${usedPrefix}vegeta off* – ⚡ 𝗗𝗲𝘀𝗮𝗰𝘁𝗶𝘃𝗮𝗿  
╰━━━━━━━━━━━━━╯  
🌟 *Estado actual:* ${estado}`;

      return conn.reply(m.chat, info, m, rcanal);
    }

    if (args[0] === 'off') {
      if (chat.isBanned) 
        return conn.reply(m.chat, '⭕ *¡VEGETA-BOT2.0 YA ESTABA DESACTIVADO!*', m, rcanal);
      
      chat.isBanned = true;
      return conn.reply(m.chat, '⚠️ *¡VEGETA-BOT2.0 HA SIDO DESACTIVADO EN ESTE CHAT!*', m, rcanal);
    } else if (args[0] === 'on') {
      if (!chat.isBanned) 
        return conn.reply(m.chat, '⭕ *¡VEGETA-BOT2.0 YA ESTABA ACTIVADO!*', m, rcanal);
      
      chat.isBanned = false;
      return conn.reply(m.chat, '✅ *¡VEGETA-BOT2.0 HA SIDO ACTIVADO EN ESTE CHAT!*', m, rcanal);
    }
  }
};

handler.help = ['vegeta'];
handler.tags = ['grupo'];
handler.command = ['vegeta'];
handler.admin = true;

export default handler;