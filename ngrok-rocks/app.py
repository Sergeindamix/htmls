@app.route('/preprocess-img', methods=['POST'])

def send_img():

    # Obtener las variables de la petición POST

    file = request.files['image']

    question = request.form.get('question')



    # Procesar la imagen y guardarla en el directorio de trabajo

    with app.app_context():

        file.save(os.path.join(current_dir, file.filename))



    # Procesar la imagen y convertirla en un tensor NumPy

    image_tensor = tf.decode_jpeg(file.stream, channels=3)



    # Inicializar las variables

    var_list = [tf.Variable(np.zeros((10, 10, 3)), trainable=False) for _ in range(NUM_IMAGES)]



    # Generar la caption

    global_step = tf.Variable(0, trainable=True)

    sequence_length = tf.Variable(10, trainable=True)

    start_scores, end_scores = create_captions(image_tensor, sequence_length, num_top_predictions=1, var_list[0])

    logits, _, _ = decode_and_round(start_scores, end_scores, var_list[0], sequence_length)

    probabilities = tf.exp(logits)

    predicted_caption = sample_from_probability(probabilities, num_samples=1)[0]



    return {"predicted_caption": predicted_caption}