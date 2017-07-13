<?php
  try
  {
    $to = "ctgovea@gmail.com";
    $subject = "Que tu alma viva - Suscripcion";
    $email_field = $_POST['email'];
    $headers = "Reply-to: " .  $email_field . "\r\n";
    
    $body = "E-Mail: " . $email_field ;

    mail($to, $subject, $body, $headers);
  }
  catch(Exception $e)
  {
    mail($to, $subject, $e->getMessage(), "");
  }
?>
