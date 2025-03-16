await conn.sendMessage(m.chat, global.banner.includes('.mp4') || global.banner.includes('.webm') ? {
        caption: txt,
        contextInfo: { mentionedJid: [userId] },
        video: { url: banner },
        gifPlayback: true
    } : {
        text: txt,
        contextInfo: {
            mentionedJid: [userId],
            externalAdReply: {
                title: botname,
                body: dev,
                thumbnailUrl: banner,
                mediaType: 1,
                showAdAttribution: true,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m });
}