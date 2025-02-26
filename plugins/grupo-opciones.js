const handler = async (m, { conn }) => {
  const { welcome, autolevelup, antiBot, antiBot2, autoAceptar, autoRechazar, autoresponder, modoadmin, reaction, nsfw, detect, antiLink, antiLink2, antitoxic, antiTraba, antifake } = global.db.data.chats[m.chat];

  const estado = (valor) => valor ? ' *`Activado`*' : ' *`Desactivado`*';

  const text = `*PANEL DE CONFIGURACIÓN DEL GRUPO* 


⚔️ *Anti-Bots:* ${estado(antiBot)}  
⚔️ *Anti-SubBots:* ${estado(antiBot2)}  
⚔️ *Modo Admin:* ${estado(modoadmin)}  
🔗 *Anti-Enlaces:* ${estado(antiLink)}  
🔗 *Anti-Enlaces Avanzado:* ${estado(antiLink2)}  
🛡 *Anti-Tóxicos:* ${estado(antitoxic)}  
⚠️ *Anti-Trabas:* ${estado(antiTraba)}  
👻 *Anti-Fakes:* ${estado(antifake)}  
🤖 *Respuesta Automática (IA):* ${estado(autoresponder)}  
✨ *Bienvenida:* ${estado(welcome)}  
✅ *Aceptación Automática:* ${estado(autoAceptar)}  
❌ *Rechazo Automático:* ${estado(autoRechazar)}  
👀 *Detección de Cambios:* ${estado(detect)}  
😂 *Reacciones Épicas:* ${estado(reaction)}  
🔞 *Modo +18:* ${estado(nsfw)}  

_*📝 Ejemplo de uso *#enable antilink*.*_`;

  await conn.sendMessage(m.chat, {
    text: text,
    contextInfo: {
      externalAdReply: {
        title: '⚔️ KIRITO-BOT',
        body: 'Gestión Avanzada del Reino',
        thumbnailUrl: avatar,
        mediaType: 1,
        showAdAttribution: true,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m });
};

handler.help = ['configuraciongrupo'];
handler.tags = ['grupo'];
handler.command = ['config', 'opciones', 'nable'];
handler.register = true;
handler.group = true;

export default handler;