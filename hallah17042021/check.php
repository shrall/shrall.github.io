<?php
include_once('connect.php');
$conn = conn();
$page = isset($_GET['p']) ? $_GET['p'] : '';
$date = date("Y-m-d H:i:s");
if ($page == 'ans') {
   $stat = $_POST['stat'];
   $num = $_POST['num'];
   $result = $conn->query("SELECT ans FROM answers WHERE id = $num");
   if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $check = $row['ans'];
   }
   if ($stat == $check) {
      $conn->query("INSERT INTO `attempts` (`id`, `ans`, `num`, `result`, `time`) VALUES (NULL, '$stat', '$num', 'benar', '$date')");
      $check = "yes";
      echo $check;
   } else {
      $conn->query("INSERT INTO `attempts` (`id`, `ans`, `num`, `result`, `time`) VALUES (NULL, '$stat', '$num', 'salah', '$date')");
      $check = "no";
      echo $check;
   }
}
if ($page == 'submit') {
   $stat = $_POST['stat'];
   $num = $_POST['num'];
   $conn->query("INSERT INTO `attempts` (`id`, `ans`, `num`, `result`, `time`) VALUES (NULL, '$stat', '$num', 'benar', '$date')");
}

if ($page == 'ded') {
   $conn->query("UPDATE status SET status = 'ded' WHERE id=1");
}

if ($page == 'dedcheck') {
   $result = $conn->query("SELECT status FROM status WHERE id = 1");
   if ($result->num_rows > 0) {
      $row = $result->fetch_assoc();
      $check = $row['status'];
   }
   echo $check;
}
