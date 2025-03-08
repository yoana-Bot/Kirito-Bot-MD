let handler = async (m, { conn, usedPrefix, command, args }) => {
  const imagenNormas = 'https://files.catbox.moe/7czphn.jpg'; // URL de la imagen

  return conn.reply(m.chat, `
┏━━━━━━━━━━━━━━━┓
┃  📜 *NORMAS DE USO* 📜  
┗━━━━━━━━━━━━━━━┛

🔹 *1. Respeto y Buen Uso:*  
Evita insultos, acoso o cualquier actitud ofensiva hacia otros usuarios.  

🔹 *2. No al Spam:*  
No abuses de los comandos en poco tiempo para evitar saturar el bot.  

🔹 *3. Contenido Permitido:*  
No compartas información ilegal, ofensiva o con derechos de autor.  

🔹 *4. Uso Responsable:*  
Kirito Bot es una herramienta de asistencia y entretenimiento, no un soporte oficial.  

🔹 *5. Seguridad y Ética:*  
No intentes explotar, hackear o modificar el bot sin autorización.  

🔹 *6. Restricciones de Uso:*  
El bot puede limitar funciones si detecta abusos.  

🔹 *7. Cierre de Acceso:*  
El incumplimiento de las normas puede llevar a bloqueos sin previo aviso.  

🔹 *📌 Nota:*  
El uso del bot implica la aceptación de estas normas.
`, m, fake); { image: { url: imagenNormas } });
};

handler.help = ['norma'];
handler.tags = ['grupo'];
handler.command = ['norma'];

export default handler;