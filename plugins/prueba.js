import fetch from "node-fetch";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m;
  let mime = (q.msg || q).mimetype || '';
  if (!mime) return conn.reply(m.chat, `❀ Por favor, responde a una imagen válida.`, m);
  
  await m.react(rwait);

  try {
    let media = await q.download();
    let { link } = await uploadToKirito(media);

    let txt = `*✅ Imagen subida con éxito.*\n\n🔗 *URL:* ${link}`;
    
    await conn.sendMessage(m.chat, { text: txt }, { quoted: m });

    await m.react(done);
  } catch {
    await m.react(error);
  }
};

handler.help = ['subir'];
handler.tags = ['herramientas'];
handler.command = ['uu', 'imgurl'];

export default handler;

async function uploadToKirito(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content], { type: mime });
  const formData = new FormData();
  formData.append("file", blob, `imagen.${ext}`);

  const response = await fetch("https://kirito-md.vercel.app/upload", {
    method: "POST",
    body: formData
  });

  const result = await response.json();
  
  if (result.success) {
    return { link: result.url };
  } else {
    throw new Error("Error al subir la imagen.");
  }
}