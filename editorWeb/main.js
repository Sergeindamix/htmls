tinymce.init({
	selector: '#editor',
	language: 'es_MX',
	branding: false,
	menubar: false,
	toolbar:
		'undo redo | styles forecolor | bold italic | alignleft aligncenter alignright alignjustify | outdent indent | image media',
	statusbar: false,
	plugins: 'image media',
});

const formulario = document.getElementById('formulario');
formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	const contenido = tinymce.activeEditor.getContent();
	console.log(contenido);
});