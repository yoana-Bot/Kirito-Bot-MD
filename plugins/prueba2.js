const handler = async (m, { conn }) => {
  await conn.sendMessage(m.chat, { 
    text: `¡Hola!

Soy desarrollador web y estoy disponible para ayudarte a crear tu página web de forma profesional y personalizada. Si necesitas una web para tu negocio, emprendimiento o proyecto, puedo diseñarla según tus necesidades.

💻 Desarrollo de páginas web – Desde $10, dependiendo de la complejidad y funciones requeridas.

Si estás interesado, contáctame y trabajemos juntos en tu proyecto. ¡Estoy listo para ayudarte a crear tu sitio web!

Contáctame: https://wa.link/jxjhek`,
    buttons: [
      {
        buttonId: '.servise',
        buttonText: { displayText: '🌐 Servicios' },
      },
      {
        buttonId: '.creador',
        buttonText: { displayText: '📞 Contactame' },
      },
      {
        buttonId: '.platafor',
        buttonText: { displayText: '💻 Plataforma' },
      },
    ],
    footer: '¡Con gusto te ayudaré!',
    viewOnce: true,
  }, { quoted: m });
};

handler.tags = ['tools'];
handler.help = ['webinfo'];
handler.command = ['web', 'servicios', 'info'];

export default handler;