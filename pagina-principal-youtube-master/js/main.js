const contenedor = document.querySelector('#contenedor');

document.querySelector('#boton-menu').addEventListener('click', () => {
	contenedor.classList.toggle('active');
});

const comprobarAncho = () => {
	if(window.innerWidth <= 768){
		contenedor.classList.remove('active');
	} else {
		contenedor.classList.add('active');
	}
}

comprobarAncho();

window.addEventListener('resize', () => {
	comprobarAncho();
});


////////////////////////////////////
let player;
window.onload = function() {
	let player;
	function onYouTubeIframeAPIReady() {
	  player = new YT.Player("player", {
		//height: "720",
		//width: "1024",
		videoId: "1-3L7Uw5yEs",
		playerVars: {
		  autoplay: 1,
		  controls: 1,
		  modestbranding: 1,
		  rel: 1,
		  showinfo: 1,
		},
		events: {
		  onReady: onPlayerReady,
		  onStateChange: onPlayerStateChange,
		},
	  });
	}
}
function onYouTubeIframeAPIReady() {
	player = new YT.Player("player", {
	  //height: "720",
	  //width: "1024",
	  videoId: "Nl3-VlYkaV0",
	  playerVars: {
		autoplay: 1,
		controls: 1,
		modestbranding: 1,
		rel: 1,
		showinfo: 1,
	  },
	  events: {
		onReady: onPlayerReady,
		onStateChange: onPlayerStateChange,
	  },
	});
  }

  function onPlayerReady(event) {
	event.target.playVideo();
  }

  function onPlayerStateChange(event) {
	if (event.data === YT.PlayerState.ENDED) {
	  let currentVideoIndex = player.getPlaylistIndex();
	  let nextVideoIndex = currentVideoIndex + 1;
	  player.playVideoAt(nextVideoIndex);
	}
  }




  function getVideoIdFromLink(link) {
	let videoId;
	if (link.includes("youtube.com/watch?v=")) {
	  videoId = link.split("youtube.com/watch?v=")[1];
	} else if (link.includes("youtu.be/")) {
	  videoId = link.split("youtu.be/")[1];
	} else {
	  return null;
	}

	if (videoId.includes("&")) {
	  videoId = videoId.split("&")[0];
	}

	return videoId;
  }


function getJSONVideos(jsonFile) {
	fetch(jsonFile)
	  .then((response) => response.json())
	  .then((data) => {
		let videos = [];
		data.forEach((item) => {
		  let videoUrl = item.url;
		  let videoTitle = item.title;
		  let videoId = videoUrl.split("=")[1]; // Obtener el ID del video de la URL
		  videos.push({ id: videoId, title: videoTitle });
		});
		updateVideoList(videos);
	  })
	  .catch((error) => console.error(error));
  }

  const input = document.getElementById("videoLinkInput");
if (!input) {
  console.error("Element with ID 'videoLinkInput' not found.");
}

  function detectarEnlace() {
	navigator.clipboard.readText().then((texto) => {
	  const expRegular = /(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
	  if (expRegular.test(texto)) {
		const enlace = texto.match(expRegular)[0];
		console.log(enlace);
		// asignar el enlace a una variable o hacer algo con él
		// Asignar el enlace al input
	  input.value = enlace;
	  } else {
		console.log("No se encontró un enlace de YouTube en el portapapeles");
	  }
	});
  }

  //Creamos un listener para el evento focus
  input.addEventListener("focus", () => {
	  //Obtenemos el contenido del portapapeles
	  navigator.clipboard.readText()
		  .then((text) => {
			  //Si el contenido es un enlace de YouTube, lo agregamos al input y actualizamos video
			  if (text.includes("youtube.com") || text.includes("youtu.be")) {
				  videoLinkInput.value = text;
				  getJSONVideos("playlist_6.json");
				  let videoLink = videoLinkInput.value;
				  let videoId = getVideoIdFromLink(videoLink);

				  if (videoId) {
				  player.loadVideoById(videoId);
				  let option = document.createElement("option");
				  option.text = videoLink;
				  option.value = videoId;
				  videoList.add(option);
				  errorMessage.style.display = "none";
				  } else {
				  errorMessage.style.display = "block";
				  }
			  }
		  })
		  .catch((err) => {
			  console.error(err);
		  });
  });