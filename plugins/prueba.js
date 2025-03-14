import fetch from "node-fetch";
import { FormData, Blob } from "formdata-node";
import { fileTypeFromBuffer } from "file-type";

// Función principal que maneja el comando de subida de archivo
let handler = async (m, { conn }) => {
  let q = m.quoted ? m.quoted : m; // Obtener el mensaje citado o el mensaje actual
  let mime = (q.msg || q).mimetype || ''; // Obtener el tipo de mime del archivo
  if (!mime) return conn.reply(m.chat, `❀ Por favor, responde a un archivo válido (imagen, video, etc.).`, m);

  await m.react(rwait); // Indicador de que el bot está esperando

  try {
    // Descargar el archivo desde WhatsApp
    let media = await q.download();
    console.log("Archivo descargado:", media); // Verificación de que el archivo se descargó

    // Verificar que el archivo es una imagen o un video
    let isTele = /image\/(png|jpe?g|gif)|video\/mp4/.test(mime);
    if (!isTele) return conn.reply(m.chat, `❀ El archivo no es compatible. Por favor, sube una imagen o video.`, m);

    // Subir el archivo al servidor
    let { link, name } = await uploadToKirito(media);
    console.log("Enlace recibido:", link); // Verificación de la URL generada

    // Responder con la URL del archivo subido
    let txt = `*✅ Imagen subida con éxito.*\n\n🔗 *URL:* ${link || 'No disponible'}`;
    await conn.sendMessage(m.chat, { text: txt }, { quoted: m });

    await m.react(done); // Indicador de que la acción fue completada con éxito
  } catch (error) {
    console.error("Error en la solicitud:", error); // Log detallado del error
    await m.react(error); // Indicador de error
    conn.reply(m.chat, `❌ Error al procesar la solicitud: ${error.message || error}`, m); // Mostrar mensaje de error detallado
  }
};

// Métodos auxiliares para manejar los comandos
handler.help = ['subir'];
handler.tags = ['herramientas'];
handler.command = ['subirimg', 'imgurl'];

export default handler;

// Función para subir el archivo a tu servidor
async function uploadToKirito(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {}; // Obtener extensión y tipo de archivo
  const blob = new Blob([content], { type: mime });
  const formData = new FormData();
  formData.append("file", blob, `imagen.${ext}`); // Nombre del archivo como 'imagen.ext'

  try {
    // Realizar la solicitud POST a la API para subir el archivo
    const response = await fetch("https://kirito-md.vercel.app/upload", {
      method: "POST",
      body: formData,
    });

    // Comprobar la respuesta de la API
    const result = await response.json();
    console.log("Resultado de la subida:", result); // Verificación de la respuesta

    // Si la subida fue exitosa, devolver el enlace
    if (result.success) {
      return { link: result.url };
    } else {
      throw new Error("Error al subir la imagen."); // Lanzar error si la subida falla
    }
  } catch (error) {
    console.error("Error en la subida:", error); // Log detallado si ocurre un error en la subida
    throw new Error("Error en la solicitud de subida.");
  }
}