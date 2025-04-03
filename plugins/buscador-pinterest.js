import _0x36ae01 from 'axios';
const {
  generateWAMessageContent,
  generateWAMessageFromContent,
  proto
} = (await import("@whiskeysockets/baileys"))["default"];
let handler = async (_0x10bd40, {
  conn: _0x9c7141,
  text: _0x27db11,
  usedPrefix: _0x55e61b,
  command: _0x5ad406
}) => {
  if (!_0x27db11) {
    return _0x9c7141.reply(_0x10bd40.chat, `${emoji} Por favor, ingresa lo que deseas buscar en pinterest.`, _0x10bd40);
  }
    await _0x10bd40.react(rwait);
 _0x9c7141.reply(_0x10bd40.chat, `${emoji2} Descargando su imagen, espere un momento...`, _0x10bd40)
  async function _0x3f3fc7(_0x5f4723) {
    const {
      imageMessage: _0x14a396
    } = await generateWAMessageContent({
      'image': {
        'url': _0x5f4723
      }
    }, {
      'upload': _0x9c7141.waUploadToServer
    });
    return _0x14a396;
  }
  function _0x2af019(_0x27693a) {
    for (let _0x5ce07a = _0x27693a.length - 1; _0x5ce07a > 0; _0x5ce07a--) {
      const _0x4d6146 = Math.floor(Math.random() * (_0x5ce07a + 1));
      [_0x27693a[_0x5ce07a], _0x27693a[_0x4d6146]] = [_0x27693a[_0x4d6146], _0x27693a[_0x5ce07a]];
    }
  }
  let _0x51323f = [];
  let {
    data: _0x4fc489
  } = await _0x36ae01.get("https://id.pinterest.com/resource/BaseSearchResource/get/?source_url=%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(judul)}%26rs%3Dtyped&data=%7B%22options%22%3A%7B%22applied_unified_filters%22%3Anull%2C%22appliedProductFilters%22%3A%22---%22%2C%22article%22%3Anull%2C%22auto_correction_disabled%22%3Afalse%2C%22corpus%22%3Anull%2C%22customized_rerank_type%22%3Anull%2C%22domains%22%3Anull%2C%22dynamicPageSizeExpGroup%22%3A%22control%22%2C%22filters%22%3Anull%2C%22journey_depth%22%3Anull%2C%22page_size%22%3Anull%2C%22price_max%22%3Anull%2C%22price_min%22%3Anull%2C%22query_pin_sigs%22%3Anull%2C%22query%22%3A%22${encodeURIComponent(judul)}%22%2C%22redux_normalize_feed%22%3Atrue%2C%22request_params%22%3Anull%2C%22rs%22%3A%22typed%22%2C%22scope%22%3A%22pins%22%2C%22selected_one_bar_modules%22%3Anull%2C%22seoDrawerEnabled%22%3Afalse%2C%22source_id%22%3Anull%2C%22source_module_id%22%3Anull%2C%22source_url%22%3A%22%2Fsearch%2Fpins%2F%3Fq%3D${encodeURIComponent(judul)}%26rs%3Dtyped%22%2C%22top_pin_id%22%3Anull%2C%22top_pin_ids%22%3Anull%7D%2C%22context%22%3A%7B%7D%7D");
  let _0x5f34cb = _0x4fc489.resource_response.data.results.map(_0x33ba1c => _0x33ba1c.images.orig.url);
  _0x2af019(_0x5f34cb);
  let _0x3b2637 = _0x5f34cb.splice(0, 5);
  let _0x2913ed = 1;
  for (let _0x47c48a of _0x3b2637) {
    _0x51323f.push({
      'body': proto.Message.InteractiveMessage.Body.fromObject({
        'text': "Imagen -" + (" " + _0x2913ed++)
      }),
      'footer': proto.Message.InteractiveMessage.Footer.fromObject({
        'text': dev
      }),
      'header': proto.Message.InteractiveMessage.Header.fromObject({
        'title': '',
        'hasMediaAttachment': true,
        'imageMessage': await _0x3f3fc7(_0x47c48a)
      }),
      'nativeFlowMessage': proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
        'buttons': [{
          'name': "cta_url",
          'buttonParamsJson': "{\"display_text\":\"url 🔗\",\"Url\":\"https://www.pinterest.com/search/pins/?rs=typed&q=" + _0x27db11 + "\",\"merchant_url\":\"https://www.pinterest.com/search/pins/?rs=typed&q=" + _0x27db11 + "\"}"
        }]
      })
    });
  }
  const _0x1ca5c6 = generateWAMessageFromContent(_0x10bd40.chat, {
    'viewOnceMessage': {
      'message': {
        'messageContextInfo': {
          'deviceListMetadata': {},
          'deviceListMetadataVersion': 0x2
        },
        'interactiveMessage': proto.Message.InteractiveMessage.fromObject({
          'body': proto.Message.InteractiveMessage.Body.create({
            'text': `${emoji} Resultado de: ` + _0x27db11
          }),
          'footer': proto.Message.InteractiveMessage.Footer.create({
            'text': "⪛✰ Pinterest - Busquedas ✰⪜"
          }),
          'header': proto.Message.InteractiveMessage.Header.create({
            'hasMediaAttachment': false
          }),
          'carouselMessage': proto.Message.InteractiveMessage.CarouselMessage.fromObject({
            'cards': [..._0x51323f]
          })
        })
      }
    }
  }, {
    'quoted': _0x10bd40
  });
  await _0x10bd40.react(done);
  await _0x9c7141.relayMessage(_0x10bd40.chat, _0x1ca5c6.message, {
    'messageId': _0x1ca5c6.key.id
  });
};
handler.help = ["pinterest"];
handler.tags = ["descargas"];
handler.coin = 1;
handler.register = true
handler.command = ['pinterest', 'pin'];

export default handler;