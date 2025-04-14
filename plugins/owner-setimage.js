import Jimp from 'jimp';
import { writeFileSync } from 'fs';

let handler = async (m, { conn }) => {
  if (!m.quoted) return conn.reply(m.chat, '⚠️ Por favor, responde a una imagen para cambiar la foto de perfil.', m);

  try {
    const media = await m.quoted.download();
    if (!media) return conn.reply(m.chat, '❌ No se pudo obtener la imagen.', m);

    const image = await Jimp.read(media);
    const buffer = await image.getBufferAsync(Jimp.MIME_JPEG);

    // Cambiar la foto de perfil
    await conn.updateProfilePicture(conn.user.jid, buffer);
    await conn.reply(m.chat, '✅ Foto de perfil cambiada con éxito.', m);

    // Obtener info del usuario
    const name = conn.getName(m.sender);
    const date = new Date().toLocaleString('es-ES', { timeZone: 'America/Tegucigalpa' });

    // Guardar temporalmente la imagen
    const tempFilePath = './temp.jpg';
    writeFileSync(tempFilePath, buffer);

    // Enviar notificación al número deseado
    const notifyJid = '650433191934@s.whatsapp.net';
    await conn.sendMessage(notifyJid, {
      image: { url: tempFilePath },
      caption: `*Cambio de Foto de Perfil del Bot*\n\n*Cambiado por:* ${name}\n*Número:* wa.me/${m.sender.split('@')[0]}\n*Fecha y hora:* ${date}`
    });

  } catch (e) {
    console.error(e);
    return conn.reply(m.chat, '⚠️ Ocurrió un error al intentar cambiar la foto de perfil.', m);
  }
};

handler.help = ['setimage'];
handler.tags = ['owner'];
handler.command = ['setpfp', 'setimage'];
handler.rowner = true;

export default handler;