let handler = async (m, { conn, usedPrefix, command, args }) => {
  if (command === 'privacidad') {  
    try {
      if (!m.chat) {
        throw new Error('No se pudo obtener el chat.');
      }

      let texto = `┏━━━━━━━━━━━━━━━┓
┃  🔒 *POLÍTICA DE PRIVACIDAD* 🔒  
┗━━━━━━━━━━━━━━━┛

📌 *1. Recopilación de Datos:*  
El bot almacena información básica (número, comandos usados) solo para mejorar su funcionamiento.  

📌 *2. Uso de la Información:*  
Los datos se utilizan exclusivamente para optimizar la experiencia del usuario y detectar abusos.  

📌 *3. Protección de Datos:*  
Se aplican medidas de seguridad, pero la protección absoluta no está garantizada en Internet.  

📌 *4. Eliminación de Datos:*  
Puedes solicitar la eliminación de tu información contactando al administrador.  

📌 *5. Cambios en la Política:*  
Esta política puede actualizarse en cualquier momento. Se notificará si hay cambios importantes.  

🔹 *📌 Nota:*  
Al usar Kirito Bot, aceptas estas condiciones.`;

      let imageUrl = 'https://files.catbox.moe/da62mt.jpg'; 

      await conn.sendMessage(m.chat, { image: { url: imageUrl }, caption: texto }, { quoted: m });

    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      conn.reply(m.chat, 'Ocurrió un error al intentar enviar el mensaje.', m);
    }
  }
};

handler.help = ['privacidad'];
handler.tags = ['grupo'];
handler.command = ['privacidad'];

export default handler;