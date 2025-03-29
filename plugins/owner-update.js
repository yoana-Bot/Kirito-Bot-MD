import { execSync } from 'child_process';

let handler = async (m, { conn, usedPrefix, command, args }) => {

  await conn.reply(m.chat, '⚡ Procesando solicitud de actualización...', m, rcanal); 

  m.react('🚀'); 
  try {
    const stdout = execSync('git pull' + (m.fromMe && args.length ? ' ' + args.join(' ') : ''));
    let messager = stdout.toString();

    if (messager.includes('⚡ Ya estoy actualizado.')) messager = '⚡ Ya estoy actualizado a la última versión.';
    if (messager.includes('👑 Actualizando.')) messager = '⚡ Procesando, espere un momento mientras me actualizo.\n\n' + stdout.toString();

    await conn.reply(m.chat, messager, m, rcanal); 
  } catch (error) { 
    try {
      const status = execSync('git status --porcelain');

      if (status.length > 0) {
        const conflictedFiles = status.toString().split('\n').filter(line => line.trim() !== '').map(line => {
          if (line.includes('.npm/') || line.includes('.cache/') || line.includes('tmp/') || line.includes('kiritoSession/') || line.includes('npm-debug.log')) {
            return null;
          }
          return '*→ ' + line.slice(3) + '*';
        }).filter(Boolean);

        if (conflictedFiles.length > 0) {
          const errorMessage = `⚡ Se han hecho cambios locales que entran en conflicto con las actualizaciones del repositorio. Para actualizar, reinstala el bot o realiza las actualizaciones manualmente.\n\n✰ *ARCHIVOS EN CONFLICTO*\n\n${conflictedFiles.join('\n')}`;
          await conn.reply(m.chat, errorMessage, m, rcanal); 
        }
      }
    } catch (error) {
      console.error(error);
      let errorMessage2 = '⚠️ Ocurrió un error inesperado.';
      if (error.message) {
        errorMessage2 += '\n⚠️ Mensaje de error: ' + error.message;
      }
      await conn.reply(m.chat, errorMessage2, m, rcanal); 
    }
  }
};

handler.command = ['update', 'reiniciar']
handler.before = async (m, { conn }) => {
    let text = m.text?.toLowerCase()?.trim();
    if (text === 'update' || text === 'reiniciar') {
        return handler(m, { conn });
handler.rowner = true;
    }
}

export default handler