<?php
$URL = "contact.html";
if( headers_sent() ) { echo("Message has been sent.<script>location.href='$URL'</script>"); }
else { header("Location: $URL"); }
exit;
?>