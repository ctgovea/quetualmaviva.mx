<?php
  try
  {
    $to = "oracion@quetualmaviva.mx, ctgovea@gmail.com";
    $subject = "Que tu alma viva - Registro";
    $name_field = $_POST['name'];
    $email_field = $_POST['email'];
    $phone_field = $_POST['phone'];
    $message = $_POST['comments'];
    $headers = "Reply-to: " .  $email_field . "\r\n";
    
    $body = $name_field. "\n E-Mail: " . $email_field . "\n Cel: " . $phone_field . "\n Mensaje:\n " . $message;

    mail($to, $subject, $body, $headers);
  }
  catch(Exception $e)
  {
    mail($to, $subject, $e->getMessage(), "");
  }
?>
