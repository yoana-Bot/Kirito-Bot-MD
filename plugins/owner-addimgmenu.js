import { promises as fs } from 'fs'
import { join } from 'path'

const mediaFile = join(process.cwd(), 'menuMedia.json')

let handler = async (m, { conn }) => {
  if (!m.quoted) return conn.reply(m.chat, '❎ Responde a una imagen o video.', m)

  let mime = m.quoted.mimetype || ''
  let isImage = mime.includes('image')
  let isVideo = mime.includes('video')

  if (!isImage && !isVideo) return conn.reply(m.chat, '❎ Solo puedes usar imágenes o videos.', m)

  let media = await m.quoted.download()
  let fileType = isImage ? 'jpg' : 'mp4'
  let fileName = `menuMedia.${fileType}`
  let filePath = join(process.cwd(), fileName)

  await fs.writeFile(filePath, media)

  let data = { url: `./${fileName}`, type: isImage ? 'image' : 'video' }
  await fs.writeFile(mediaFile, JSON.stringify(data), 'utf-8')

  global.banner = data.url

  conn.reply(m.chat, `✅ Se ha guardado la nueva ${isImage ? '📷 Imagen' : '🎥 Video'} para el menú.`, m)
}

handler.command = ['.Addimagemenu', 'delowner']
handler.rowner = true;
export default handler;