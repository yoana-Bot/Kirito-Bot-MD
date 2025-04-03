import axios from 'axios';
const { generateWAMessageContent, generateWAMessageFromContent, proto } = (await import("@whiskeysockets/baileys"))["default"];

let handler = async (_0x10bd40, { conn: _0x9c7141, text: _0x27db11, usedPrefix: _0x55e61b, command: _0x5ad406 }) => {
  if (!_0x27db11) {
    return _0x9c7141.reply(_0x10bd40.chat, '⚠️ Por favor, ingresa lo que deseas buscar en Pinterest.', _0x10bd40);
  }

  await _0x10bd40.react('⏳'); // React with loading emoji
  _0x9c7141.reply(_0x10bd40.chat, '🔽 Descargando imágenes, por favor espera...', _0x10bd40);

  // Function to generate image message
  async function generateImageMessage(imageUrl) {
    const { imageMessage } = await generateWAMessageContent({
      'image': {
        'url': imageUrl
      }
    }, {
      'upload': _0x9c7141.waUploadToServer
    });
    return imageMessage;
  }

  // Function to shuffle array (Fisher-Yates algorithm)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  try {
    // Fetching Pinterest search results
    const { data } = await axios.get(`https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${_0x27db11}&data=%7B%22options%22%3A%7B%22isPrefetch%22%3Afalse%2C%22query%22%3A%22${_0x27db11}%22%2C%22scope%22%3A%22pins%22%2C%22no_fetch_context_on_resource%22%3Afalse%7D%2C%22context%22%3A%7B%7D%7D`);

    let images = data.resource_response.data.results.map(item => item.images.orig.url);
    shuffleArray(images);

    let selectedImages = images.slice(0, 5); // Get top 5 images
    let messageItems = [];
    let counter = 1;

    // Create the interactive message carousel
    for (let imageUrl of selectedImages) {
      messageItems.push({
        'body': proto.Message.InteractiveMessage.Body.fromObject({
          'text': `Imagen - ${counter++}`
        }),
        'footer': proto.Message.InteractiveMessage.Footer.fromObject({
          'text': 'Pinterest - Busquedas'
        }),
        'header': proto.Message.InteractiveMessage.Header.fromObject({
          'title': '',
          'hasMediaAttachment': true,
          'imageMessage': await generateImageMessage(imageUrl)
        }),
        'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
          'buttons': [{
            'name': "cta_url",
            'buttonParamsJson': `{"display_text":"Ver en Pinterest 🔗","Url":"https://www.pinterest.com/search/pins/?rs=typed&q=${_0x27db11}","merchant_url":"https://www.pinterest.com/search/pins/?rs=typed&q=${_0x27db11}"}`
          }]
        })
      });
    }

    // Generate the final message with carousel of images
    const finalMessage = generateWAMessageFromContent(_0x10bd40.chat, {
      'viewOnceMessage': {
        'message': {
          'messageContextInfo': {
            'deviceListMetadata': {},
            'deviceListMetadataVersion': 2
          },
          'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
            'body': proto.Message.InteractiveMessage.Body.create({
              'text': `🔍 Resultado de: ${_0x27db11}`
            }),
            'footer': proto.Message.InteractiveMessage.Footer.create({
              'text': "⪛✰ Pinterest - Busquedas ✰⪜"
            }),
            'header': proto.Message.InteractiveMessage.Header.create({
              'hasMediaAttachment': false
            }),
            'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
              'cards': [...messageItems]
            })
          })
        }
      }
    }, {
      'quoted': _0x10bd40
    });

    await _0x10bd40.react('✅'); // React with done emoji
    await _0x9c7141.relayMessage(_0x10bd40.chat, finalMessage.message, {
      'messageId': finalMessage.key.id
    });
  } catch (error) {
    console.error(error);
    await _0x9c7141.reply(_0x10bd40.chat, '❌ Ocurrió un error al buscar imágenes. Intenta nuevamente más tarde.', _0x10bd40);
  }
};

handler.help = ["pinterest"];
handler.tags = ["descargas"];
handler.coin = 1;
handler.register = true;
handler.command = ['pinterest', 'pin'];

export default handler;