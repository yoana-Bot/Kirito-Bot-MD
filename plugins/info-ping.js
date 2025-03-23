import speed from 'performance-now';
import { exec } from 'child_process';

let handler = async (m, { conn }) => {
    let timestamp = speed();
    let latensi = speed() - timestamp;
    exec(`neofetch --stdout`, (error, stdout, stderr) => {
        let sysinfo = stdout.toString("utf-8");
        sysinfo = sysinfo.replace(/Memory:/, "Ram:");
        // Extraer las primeras líneas de la info para un mensaje compacto
        let sysLines = sysinfo.split("\n").slice(0, 5).join("\n");

        let message = `
╭───〔 *¡Pong!* 〕───╮
│ ⏱️ *Tiempo:* ${latensi.toFixed(4)} ms
│
│ 💻 *Sistema:*
│ ${sysLines}
╰────────────────────╯
`;
        conn.reply(m.chat, message, m);
    });
};

handler.help = ['ping'];
handler.tags = ['info'];
handler.command = ['ping', 'p'];
handler.register = true;

export default handler;