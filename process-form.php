<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Configuración del correo
    $to = "vive@liveseguros.cl"; // Reemplaza con tu correo
    $from = $_POST['email'];
    $name = $_POST['nombre'];
    $phone = $_POST['telefono'];
    $insurance = $_POST['tipoSeguro'];
    $message = $_POST['mensaje'];

    // Asunto del correo
    $subject = "Nuevo contacto desde el sitio web - $name";

    // Construir el cuerpo del mensaje
    $email_content = "Nombre: $name\n";
    $email_content .= "Email: $from\n";
    $email_content .= "Teléfono: $phone\n";
    $email_content .= "Tipo de Seguro: $insurance\n\n";
    $email_content .= "Mensaje:\n$message\n";

    // Headers del correo
    $headers = "From: $from\r\n";
    $headers .= "Reply-To: $from\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Enviar el correo
    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(['success' => true, 'message' => 'Mensaje enviado correctamente']);
    } else {
        echo json_encode(['success' => false, 'message' => 'Error al enviar el mensaje']);
    }
    exit;
}
?> 