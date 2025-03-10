import { igdl } from 'ruhend-scraper'

const handler = async (m, { text, conn, args }) => {
  if (!args[0]) {
    return conn.reply(m.chat, `${emoji} Por favor, ingresa un enlace de Facebook.`, m)
  }

  let res;
  try {
    await m.react(rwait); // solo se ejecuta una vez
    res = await igdl(args[0]);
  } catch (e) {
    return conn.reply(m.chat, `${msm} Error al obtener datos. Verifica el enlace.`, m)
  }

  let result = res.data;
  if (!result || result.length === 0) {
    return conn.reply(m.chat, `${emoji2} No se encontraron resultados.`, m)
  }

  let data;
  try {
    data = result.find(i => i.resolution === "720p (HD)") || result.find(i => i.resolution === "360p (SD)");
  } catch (e) {
    return conn.reply(m.chat, `${msm} Error al procesar los datos.`, m)
  }

  if (!data) {
    return conn.reply(m.chat, `${emoji2} No se encontró una resolución adecuada.`, m)
  }

  let video = data.url;
  try {
    await conn.sendMessage(m.chat, { video: { url: video }, caption: ` ╭──────⚔──────╮  
  ${emoji} 𝑲𝑰𝑹𝑰𝑻𝑶-𝑩𝑶𝑻 𝑴𝑫   
╰──────⚔──────╯  
⟢ 𝑨𝒌𝒊 𝒕𝒊𝒆𝒏𝒆𝒔: *˙Ⱉ˙ฅ*  
⟢ 𝑫𝒊𝒔𝒇𝒓𝒖𝒕𝒂 *❛‿˂̵✧*.`, fileName: 'fb.mp4', mimetype: 'video/mp4' }, { quoted: m })
    await m.react(done); // solo se ejecuta una vez al final
  } catch (e) {
    return conn.reply(m.chat, `${msm} Error al enviar el video.`, m)
    await m.react(error); // reacción solo si hubo error
  }
}

handler.help = ['facebook', 'fb']
handler.tags = ['descargas']
handler.command = ['facebook', 'fb']
handler.group = true;
handler.register = true;
handler.coin = 2;

export default handler