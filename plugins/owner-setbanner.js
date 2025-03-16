import fs from 'fs';  
import path from 'path';  
import fetch from "node-fetch";
import crypto from "crypto";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

let handler = async (m, { conn, isRowner }) => {

  // Verifica que se responda a un mensaje que contenga imagen o video
  if (!m.quoted || !/(image|video)/.test(m.quoted.mimetype)) 
    return m.reply(`${emoji} Por favor, responde a una imagen o video con el comando *setbanner* para actualizar el banner del menú.`);

  try {
    const media = await m.quoted.download();

    // Determina si es imagen o video
    const isImg = /image/.test(m.quoted.mimetype);
    const isVid = /video/.test(m.quoted.mimetype);

    // Si es imagen, valida que sea una imagen válida
    if (isImg && !isImageValid(media)) {
      return m.reply(`${emoji2} El archivo enviado no es una imagen válida.`);
    }

    // Subimos el archivo a catbox y obtenemos el link
    let link = await catbox(media);

    // Asignamos global.banner con el link obtenido
    global.banner = `${link}`;

    // Definimos la extensión en base al tipo de archivo
    let ext = isImg ? 'jpg' : 'mp4';
    let filename = `banner.${ext}`;

    await conn.sendFile(m.chat, media, filename, `${emoji} Banner actualizado.`, m);

  } catch (error) {
    console.error(error);
    m.reply(`${msm} Hubo un error al intentar cambiar el banner.`);
  }
};

const isImageValid = (buffer) => {
  const magicBytes = buffer.slice(0, 4).toString('hex');
  if (magicBytes === 'ffd8ffe0' || magicBytes === 'ffd8ffe1' || magicBytes === 'ffd8ffe2') {
    return true;
  }
  if (magicBytes === '89504e47') {
    return true;
  }
  if (magicBytes === '47494638') {
    return true;
  }
  return false; 
};

handler.help = ['setbanner'];
handler.tags = ['tools'];
handler.command = ['setbanner'];
handler.rowner = true;

export default handler;

function formatBytes(bytes) {
  if (bytes === 0) {
    return "0 B";
  }
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}

async function catbox(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {};
  const blob = new Blob([content.toArrayBuffer()], { type: mime });
  const formData = new FormData();
  const randomBytes = crypto.randomBytes(5).toString("hex");
  formData.append("reqtype", "fileupload");
  formData.append("fileToUpload", blob, randomBytes + "." + ext);

  const response = await fetch("https://catbox.moe/user/api.php", {
    method: "POST",
    body: formData,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/44.0.2403.157 Safari/537.36",
    },
  });

  return await response.text();
}