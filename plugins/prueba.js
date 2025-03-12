const axios = require('axios');

async function generarLogo(estilo, texto) {
    try {
        const url = `https://flamingtext.com/net-fu/proxy_form.cgi?&script=${estilo}-logo&text=${encodeURIComponent(texto)}`;

        return url; // Devuelve la URL del logo generado
    } catch (error) {
        console.error('Error al generar el logo:', error);
        return null;
    }
}

// Ejemplo de uso
generarLogo('neon', 'Kirito-Bot').then(console.log);