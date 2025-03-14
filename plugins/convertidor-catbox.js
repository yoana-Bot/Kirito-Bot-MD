<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Subir Archivos</title>
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h2>Subir archivos</h2>
    <form id="uploadForm">
        <input type="file" id="fileInput" multiple required>
        <button type="button" onclick="uploadFiles()">Subir</button>
    </form>
    <div id="status"></div>
    <div id="links"></div>

    <script>
        async function uploadFiles() {
            const fileInput = document.getElementById("fileInput");
            const status = document.getElementById("status");
            const links = document.getElementById("links");

            if (!fileInput.files.length) {
                status.textContent = "Selecciona al menos un archivo.";
                return;
            }

            status.innerHTML = "⏳ Subiendo archivos...";
            links.innerHTML = "";

            const apiKeyImgBB = "10604ee79e478b08aba6de5005e6c798";
            const catboxUserHash = "TU_USERHASH"; // Reemplázalo con tu User Hash de Catbox

            for (const file of fileInput.files) {
                const formData = new FormData();
                formData.append("fileToUpload", file);

                try {
                    let fileUrl = "";

                    if (file.type.startsWith("image/")) {
                        // Subir imágenes a ImgBB
                        const imgResponse = await axios.post(`https://api.imgbb.com/1/upload?key=${apiKeyImgBB}`, formData);
                        if (imgResponse.data.success) {
                            fileUrl = imgResponse.data.data.url;
                        } else {
                            links.innerHTML += `<p>❌ Error al subir ${file.name}.</p>`;
                            continue;
                        }
                    } else {
                        // Subir videos a Catbox.moe
                        formData.append("reqtype", "fileupload");
                        formData.append("userhash", catboxUserHash);

                        const catboxResponse = await axios.post("https://catbox.moe/user/api.php", formData, {
                            headers: { "Content-Type": "multipart/form-data" }
                        });

                        if (catboxResponse.data.startsWith("https://")) {
                            fileUrl = catboxResponse.data;
                        } else {
                            links.innerHTML += `<p>❌ Error al subir ${file.name} a Catbox.</p>`;
                            continue;
                        }
                    }

                    // Generar la URL personalizada con Kirito-Bot
                    const encodedUrl = encodeURIComponent(fileUrl);
                    const result = await axios.get(`https://kirito-md.vercel.app/api/imagen?url=${encodedUrl}`);

                    if (result.status === 200) {
                        links.innerHTML += `<p>✅ Archivo subido: <a href="${fileUrl}" target="_blank">${fileUrl}</a></p>`;
                    } else {
                        links.innerHTML += `<p>✅ Subido pero sin URL personalizada: <a href="${fileUrl}" target="_blank">${fileUrl}</a></p>`;
                    }
                } catch (error) {
                    console.error(error);
                    links.innerHTML += `<p>❌ Error al subir ${file.name}.</p>`;
                }
            }
            status.innerHTML = "✅ Todos los archivos procesados.";
        }
    </script>
</body>
</html>