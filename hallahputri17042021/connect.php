<?php
function conn(){
    $dbhost = "localhost";
    $dbuser = "root";
    $dbpass = "";
    $db = "badut";
    $connect = mysqli_connect($dbhost, $dbuser, $dbpass, $db)
    or die ("ERROR DURING CONNECTION");
    return $connect;
}
function closed($n){
    mysqli_close($n);
}