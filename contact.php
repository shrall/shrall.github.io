<?php 
if(isset($_POST['submit'])){
    $to = "shrallvierdo@gmail.com";
    $from = $_POST['email'];
    $full_name = $_POST['full_name'];
    $subject = "shrall.xyz contact form submission";
    $subject2 = "Copy of your form submission";
    $message = $full_name . " wrote the following:" . "\n\n" . $_POST['message'];
    $message2 = "Here is a copy of your message " . $full_name . "\n\n" . $_POST['message'];
    $result ='<div id="alert">Message has been sent! Thank you! I will contact you shortly.</div>';
    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); 
    header('Location: thankyou.php'); 
    }
?>
