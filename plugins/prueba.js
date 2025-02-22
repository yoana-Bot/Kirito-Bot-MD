import { createHash } from 'crypto';

let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender];
  let pp = await conn.profilePictureUrl(m.sender, 'image').catch(_ => './src/avatar_contact.png');

  if (user.registered) throw `✳️ Ya estás registrado.\n\nUsa *${usedPrefix}unreg <sn>* para eliminar tu registro.`;

  let regex = /^(.+?)[.|+](\d+)[.|+]?([MFN])?$/i;
  let match = text.match(regex);
  if (!match) throw `✳️ Uso correcto: *${usedPrefix + command} nombre.edad.género*\n📌 Ejemplo: *${usedPrefix + command} Kirito+18+M*\n\n◉ Géneros disponibles:\n- *M* = Hombre\n- *F* = Mujer\n- *N* = Otro`;

  let [_, name, age, gender] = match;
  if (name.length > 30) throw `✳️ El nombre no puede superar los 30 caracteres.`;
  
  age = parseInt(age);
  if (age < 10) throw '🚼 Debes tener al menos 10 años para registrarte.';
  if (age > 60) throw '👴🏻 No puedes registrarte con más de 60 años.';

  let genderText = gender?.toUpperCase() === 'M' ? '🙆🏻‍♂️ Hombre' :
                   gender?.toUpperCase() === 'F' ? '🤵🏻‍♀️ Mujer' :
                   gender?.toUpperCase() === 'N' ? '⚧ Otro' : '⚪ No especificado';

  user.name = name.trim();
  user.age = age;
  user.gender = genderText;
  user.regTime = +new Date();
  user.coin = (user.coin || 0) + 8400;
  user.registered = true;

  let sn = createHash('md5').update(m.sender).digest('hex');
  let message = `🎉 *Registro Exitoso*\n\n📌 *Nombre:* ${name}\n🎂 *Edad:* ${age}\n⚧️ *Género:* ${genderText}\n🆔 *Número de Serie:* ${sn}\n\n💰 Se te han añadido *8400 coins* 🪙 como bono de registro.`;

  let buttonMessage = {
    image: { url: pp },
    caption: message,
    footer: '𝑲𝒊𝒓𝒊𝒕𝒐-𝑩𝒐𝒕 ©',
    buttons: [{ buttonId: `${usedPrefix}menu`, buttonText: { displayText: '📜 Menú' }, type: 1 }],
    headerType: 4
  };

  await conn.sendMessage(m.chat, buttonMessage, { quoted: m });
};

handler.help = ['register', 'reg'].map(v => v + ' <nombre.edad.género>');
handler.tags = ['registro'];
handler.command = ['register', 'rege', 'registrar', 'verificar'];

export default handler;