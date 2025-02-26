const handler = async (m, { conn }) => {
  const { welcome, autolevelup, antiBot, antiBot2, autoAceptar, autoRechazar, autoresponder, modoadmin, reaction, nsfw, detect, antiLink, antiLink2, antitoxic, antiTraba, antifake } = global.db.data.chats[m.chat];

  const estado = (valor) => valor ? ' *Activado*' : ' *Desactivado*';

  const text = `*PANEL DE CONFIGURACIÓN DEL GRUPO* 

🔹 *Guardianes del Reino (Seguridad)*  
> ⚔️ *Anti-Bots:* ${estado(antiBot)}  
> ⚔️ *Anti-SubBots:* ${estado(antiBot2)}  
> ⚔️ *Modo Admin:* ${estado(modoadmin)}  
> 🔗 *Anti-Enlaces:* ${estado(antiLink)}  
> 🔗 *Anti-Enlaces Avanzado:* ${estado(antiLink2)}  
> 🛡 *Anti-Tóxicos:* ${estado(antitoxic)}  
> ⚠️ *Anti-Trabas:* ${estado(antiTraba)}  
> 👻 *Anti-Fakes:* ${estado(antifake)}  

🌟 *Sistema de Poder y Nivel*  
> 🔺 *Subida de Nivel Automática:* ${estado(autolevelup)}  
> 🤖 *Respuesta Automática (IA):* ${estado(autoresponder)}  

⚡ *Interacción del Reino*  
> ✨ *Bienvenida a Guerreros:* ${estado(welcome)}  
> ✅ *Aceptación Automática de Reinos:* ${estado(autoAceptar)}  
> ❌ *Rechazo Automático de Invasores:* ${estado(autoRechazar)}  
> 👀 *Detección de Cambios:* ${estado(detect)}  
> 😂 *Reacciones Épicas:* ${estado(reaction)}  
> 🔞 *Modo +18:* ${estado(nsfw)}  

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