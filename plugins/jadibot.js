case isCommand3: {
  const users = [...new Set([...global.conns.filter((conn) => conn.user && conn.ws.socket && conn.ws.socket.readyState !== ws.CLOSED)])];

  function convertirMsADiasHorasMinutosSegundos(ms) {
    var segundos = Math.floor(ms / 1000);
    var minutos = Math.floor(segundos / 60);
    var horas = Math.floor(minutos / 60);
    var días = Math.floor(horas / 24);
    segundos %= 60;
    minutos %= 60;
    horas %= 24;
    var resultado = "";
    if (días !== 0) resultado += días + " días, ";
    if (horas !== 0) resultado += horas + " horas, ";
    if (minutos !== 0) resultado += minutos + " minutos, ";
    if (segundos !== 0) resultado += segundos + " segundos";
    return resultado;
  }

  const message = users.map((v, index) => `
╭━━━〔 *${index + 1}* 〕━━━✦
┃👤 *Usuario:* ${v.user.name || 'Sub-Bot'}
┃🔗 *Link:* wa.me/${v.user.jid.replace(/[^0-9]/g, '')}?text=${usedPrefix}estado
┃⏳ *Online:* ${v.uptime ? convertirMsADiasHorasMinutosSegundos(Date.now() - v.uptime) : 'Desconocido'}
╰━━━━━━━━━━━━━━━✦
`).join('\n');

  const totalUsers = users.length;
  const replyMessage = message.length === 0 
    ? `⛔ No hay Sub-Bots disponibles por el momento. Intenta más tarde.` 
    : `╔═══════✦✗✦═══════╗
  *Lista de Sub-Bots Activos*  
        ᴷⁱʳⁱᵗᵒ⁻ᴮᵒᵗ ᴹᴰ
╚═══════✦✗✦═══════╝

${message}

∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞∞
*Total:* ${totalUsers} Sub-Bots
*Estado:* Operativos`;

  const responseMessage = `${emoji} *SUB-BOTS CONECTADOS:*\n\n${emoji2} Puedes solicitar permiso para unir un Sub-Bot a tu grupo.\n\n\`\`\`Cada usuario Sub-Bot es responsable de su propio uso. El número principal no se hace responsable del mal uso.\`\`\`\n\n${replyMessage.trim()}`;

  await _envio.sendMessage(m.chat, { text: responseMessage, mentions: _envio.parseMention(responseMessage) }, { quoted: m });
  break;
}