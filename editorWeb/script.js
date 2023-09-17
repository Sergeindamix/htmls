document.addEventListener("DOMContentLoaded", function() {
    tinymce.init({
        selector: "#my-editor",
        height: 500,
        plugins: [
            "advlist autolink lists link image charmap print preview anchor",
            "searchreplace visualblocks code fullscreen",
            "insertdatetime media table paste code help wordcount"
        ],
        toolbar: "undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help"
    });

    document.getElementById("guardar").addEventListener("click", function() {
        var contenido = tinymce.get("my-editor").getContent();
        console.log(contenido); // Aquí puedes realizar acciones con el contenido, como enviarlo al servidor
    });
});
