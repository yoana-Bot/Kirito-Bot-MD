// © Deylin 


const banderas = [
  { pais: "Honduras", emoji: "🇭🇳" },
  { pais: "México", emoji: "🇲🇽" },
  { pais: "Brasil", emoji: "🇧🇷" },
  { pais: "Argentina", emoji: "🇦🇷" },
  { pais: "España", emoji: "🇪🇸" },
  { pais: "Colombia", emoji: "🇨🇴" },
  { pais: "Chile", emoji: "🇨🇱" },
  { pais: "Estados Unidos", emoji: "🇺🇸" },
  { pais: "Canadá", emoji: "🇨🇦" },
  { pais: "Japón", emoji: "🇯🇵" }
]

const juegoBanderas = new Map()

function elegirBanderaAleatoria() {
  return banderas[Math.floor(Math.random() * banderas.length)]
}

let handler = async (m, { conn }) => {
  if (juegoBanderas.has(m.sender)) {
    return conn.reply(m.chat, "Ya tienes un juego en curso. ¡Responde primero!", m)
  }

  const seleccionada = elegirBanderaAleatoria()
  juegoBanderas.set(m.sender, { pais: seleccionada.pais.toLowerCase(), intentos: 2 })

  let text = `*🎌 Adivina la bandera:*\n\n» ${seleccionada.emoji}\n\n*Responde con el nombre del país.*\nTienes 2 corazones ❤️❤️`
  conn.reply(m.chat, text, m)
}

handler.before = async (m, { conn }) => {
  const juego = juegoBanderas.get(m.sender)
  if (!juego) return

  const respuesta = m.text.trim().toLowerCase()
  if (respuesta === juego.pais) {
    juegoBanderas.delete(m.sender)
    return conn.reply(m.chat, `¡Correcto! Adivinaste la bandera de *${juego.pais.charAt(0).toUpperCase() + juego.pais.slice(1)}* 🥳`, m)
  } else {
    juego.intentos--
    if (juego.intentos <= 0) {
      juegoBanderas.delete(m.sender)
      return conn.reply(m.chat, `❌ Perdiste. La respuesta correcta era *${juego.pais.charAt(0).toUpperCase() + juego.pais.slice(1)}*`, m)
    } else {
      return conn.reply(m.chat, `❌ Incorrecto. Te quedan ${juego.intentos} corazón(es) ❤️`, m)
    }
  }
}

handler.help = ['adivinabandera']
handler.tags = ['game']
handler.command = ['adivinabandera']
handler.group = true
handler.register = true

export default handler