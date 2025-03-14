async function uploadToKirito(content) {
  const { ext, mime } = (await fileTypeFromBuffer(content)) || {}; // Obtener la extensión y el tipo del archivo
  const blob = new Blob([content], { type: mime }); // Crear un Blob con el contenido y tipo
  const formData = new FormData(); // Crear el formulario de datos
  formData.append("file", blob, `imagen.${ext}`); // Adjuntar el archivo en el formulario
  
  try {
    // Realizar la solicitud POST para subir el archivo
    const response = await fetch("https://kirito-md.vercel.app/upload", {
      method: "POST", // Método POST
      body: formData, // Cuerpo con los datos del formulario
    });

    // Verificar el estado de la respuesta
    console.log("Estado de la respuesta:", response.status);

    // Intentar convertir la respuesta a JSON
    const result = await response.json();
    console.log("Resultado de la subida:", result); // Mostrar el resultado en los logs

    // Si la subida fue exitosa, devolver el enlace del archivo
    if (result.success) {
      return { link: result.url }; // Retornar el enlace de la imagen
    } else {
      throw new Error(result.message || "Error desconocido al subir el archivo.");
    }
  } catch (error) {
    // Mostrar el error en los logs si algo falla
    console.error("Error en la subida:", error.message); 
    throw new Error("Error en la solicitud de subida.");
  }
}

async function handleFileUpload(event) {
  const fileInput = document.getElementById("fileInput"); // Obtener el archivo desde el input
  const status = document.getElementById("status"); // Mostrar el estado de la subida
  const link = document.getElementById("link"); // Mostrar el enlace al archivo
  
  if (!fileInput.files.length) {
    status.textContent = "❀ Por favor, selecciona un archivo primero.";
    return;
  }

  status.textContent = "Subiendo archivo..."; // Cambiar el estado al inicio de la subida
  link.innerHTML = ""; // Limpiar el enlace previo

  const formData = new FormData(); // Crear el formulario de datos
  formData.append("file", fileInput.files[0]); // Adjuntar el archivo seleccionado

  try {
    const response = await fetch("https://kirito-md.vercel.app/upload", {
      method: "POST", // Método de la solicitud
      body: formData, // Cuerpo de la solicitud con los datos del formulario
    });

    // Verificar el estado de la respuesta
    const result = await response.json();
    console.log("Resultado de la subida:", result);

    if (result.success) {
      status.textContent = "✅ Archivo subido con éxito."; // Confirmar éxito de la subida
      link.innerHTML = `<a href="${result.url}" target="_blank">📂 Ver archivo</a>`; // Mostrar el enlace del archivo
    } else {
      status.textContent = `❌ Error al subir archivo: ${result.message || 'No disponible'}`; // Manejar errores
    }
  } catch (error) {
    // Mostrar error si hay un fallo en la solicitud
    status.textContent = `❌ Error en la solicitud: ${error.message}`;
  }
}