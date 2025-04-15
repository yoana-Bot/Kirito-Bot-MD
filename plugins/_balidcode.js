// Creado por Deylin, no quites créditos.

let handler = async (m, { conn, usedPrefix, command, args }) => {
    // Definición de los botones
    const buttons = [
                    {
                "name": "cta_copy",
                "buttonParamsJson": JSON.stringify({
                "display_text": "Descargar audio! 🎧",
                "copy_code": `.ytmp3`
                })
              },{
                "name": "cta_copy",
                "buttonParamsJson": JSON.stringify({
                "display_text": "Descargar video! 📹",
                "copy_code": `.ytmp4`
                })
              }
                ];
    
    // Mensaje con botones
    const buttonMessage = {
        text: '⚠ *Si estás conectado a otra sesión de sub-bot, por favor te recomiendo que te desconectes o no te conectes a este bot. Si estás conectado a dos, tu cuenta podría ser baneada de WhatsApp y además podrían surgir problemas en el sistema del bot.*\n\n*/serbot --code*\n> Vincula con código de 8 dígitos\n*/serbot*\n> vincula con código QR',
        footer: 'Deylin',
        buttons: buttons,
        headerType: 1
    };
    
    return conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['code', 'qr'];

export default handler;