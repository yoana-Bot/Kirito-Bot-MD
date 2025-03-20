// Mapeo de letras normales a letras en negrita
const boldMapping = {
    'a': '𝐀', 'b': '𝐁', 'c': '𝐂', 'd': '𝐃', 'e': '𝐄', 'f': '𝐅',
    'g': '𝐆', 'h': '𝐇', 'i': '𝐈', 'j': '𝐉', 'k': '𝐊', 'l': '𝐋',
    'm': '𝐌', 'n': '𝐍', 'o': '𝐎', 'p': '𝐏', 'q': '𝐐', 'r': '𝐑',
    's': '𝐒', 't': '𝐓', 'u': '𝐔', 'v': '𝐕', 'w': '𝐖', 'x': '𝐗',
    'y': '𝐘', 'z': '𝐙'
};

// Función para convertir el texto a negrita
function convertirTextoABold(texto) {
    return texto.split('').map(char => boldMapping[char.toLowerCase()] || char).join('');
}

// Interceptamos las respuestas del bot antes de enviarlas
function enviarRespuesta(bot, chatId, mensaje) {
    const mensajeEstilizado = convertirTextoABold(mensaje);
    bot.sendMessage(chatId, mensajeEstilizado); // Aquí se envía el mensaje ya convertido
}

// Ejemplo de uso en un bot de WhatsApp, Telegram o Discord
function manejarMensaje(msg) {
    const chatId = msg.chat.id;
    const respuesta = "Hola, ¿cómo estás?"; // Esto lo generaría tu bot
    enviarRespuesta(bot, chatId, respuesta);
}