const { generateWAMessageFromContent, proto } = (await import('@whiskeysockets/baileys')).default

var handler = async (m, { conn, text }) => {
  conn.reply(m.chat, `${emoji2} Buscando un insulto, espere un momento...`, m, rcanal)

  conn.reply(m.chat, `*┏━⚠️━┓*\n\n❥ *"${pickRandom(global.insultos)}"*\n\n*┗━⚠️━┛*`, m, rcanal)
}

handler.help = ['insulto']
handler.tags = ['fun']
handler.command = ['insulto']
handler.fail = null
handler.exp = 0
handler.group = true
handler.register = true

export default handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.insultos = [
  "Eres el motivo por el que existen las instrucciones de los champús.",
  "Si la estupidez doliera, estarías chillando todo el día.",
  "No eres inútil, al menos sirves de mal ejemplo.",
  "Tu coeficiente intelectual es una leyenda urbana.",
  "Eres la razón por la que los aliens no quieren visitarnos.",
  "¿Siempre hablas así o hoy te olvidaste el cerebro?",
  "Tienes algo en la cara... Ah no, siempre es así.",
  "No eres tonto... solo tienes mala suerte pensando.",
  "Si fueras más lento, irías hacia atrás.",
  "Eres como una nube: cuando desapareces, el día mejora.",
  "Tu lógica es tan sólida como una gelatina en un terremoto.",
  "Podrías ser un personaje... de una tragedia.",
  "¿Eres wifi? Porque siento que cada vez que hablas me desconecto.",
  "Hasta un gato caminando por el teclado es más productivo que tú.",
  "Hablar contigo es como jugar ajedrez con una paloma: tira las piezas, se caga en el tablero y actúa como si hubiera ganado."
]