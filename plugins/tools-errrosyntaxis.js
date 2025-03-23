import fs from 'fs';
import path from 'path';
import acorn from 'acorn';

var handler = async (m, { usedPrefix, command }) => {
    try {
        await m.react('🕒');
        conn.sendPresenceUpdate('composing', m.chat);

        const pluginsDir = './plugins';
        const files = fs.readdirSync(pluginsDir).filter(file => file.endsWith('.js'));

        let response = `📂 *Revisión de Syntax Errors:*\n\n`;
        let hasErrors = false;

        for (const file of files) {
            const filePath = path.resolve(pluginsDir, file);
            const code = fs.readFileSync(filePath, 'utf-8');

            try {
                // Primero se verifica el código con acorn para detectar errores de sintaxis
                acorn.parse(code, { ecmaVersion: 'latest', locations: true });
            } catch (error) {
                hasErrors = true;
                response += `🚩 *Error de sintaxis en:* ${file}\n`;
                if (error.loc) {
                    response += `*Línea:* ${error.loc.line}, *Columna:* ${error.loc.column}\n`;
                }
                response += `*Mensaje:* ${error.message}\n\n`;
                // Saltar la importación si ya hay error de sintaxis
                continue;
            }

            try {
                // Si el parseo fue exitoso, se intenta la importación
                await import(filePath);
            } catch (error) {
                hasErrors = true;
                response += `🚩 *Error en la importación de:* ${file}\n`;
                response += `*Mensaje:* ${error.message}\n\n`;
            }
        }

        if (!hasErrors) {
            response += '✅ ¡Todo está en orden! No se detectaron errores de sintaxis ni de importación.';
        }

        await conn.reply(m.chat, response, m);
        await m.react('✅');
    } catch (err) {
        await m.react('✖️');
        console.error(err);
        conn.reply(m.chat, '🚩 *Ocurrió un fallo al verificar los plugins.*', m);
    }
};

handler.command = ['errores'];
handler.help = ['errores'];
handler.tags = ['tools'];
handler.register = true;

export default handler;