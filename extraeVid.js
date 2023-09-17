// Obtén la referencia a la etiqueta de video
const video = document.querySelector('video');

// Verifica si se encontró una etiqueta de video en el documento
if (video) {
  // Obtiene la URL del video
  const videoUrl = video.getAttribute('src');
  
  // Imprime la URL del video en la consola
  console.log(videoUrl);
} else {
  console.log('No se encontró ninguna etiqueta de video en el documento.');
}