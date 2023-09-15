<?php
$maticni_broj = $_POST['maticni_broj'];

$conn = new mysqli('ftp.milev051.mycpanel.rs', 'milev051_eposUser', 'eposPassword', 'milev051_eposPhp');
if ($conn->connect_error)   die('Greška pri povezivanju sa bazom: ' . $conn->connect_error);

$sql = "DELETE FROM Kompanije WHERE maticni_broj = '$maticni_broj'";

if ($conn->query($sql) === TRUE) {
} else {
    echo $conn->error;
}

$conn->close();






