<?php
$maticni_broj = $_POST['maticni_broj'];
$ime_kompanije = $_POST['ime_kompanije'];
$datum_unosa = $_POST['datum_unosa'];

$conn = new mysqli('ftp.milev051.mycpanel.rs', 'milev051_eposUser', 'eposPassword', 'milev051_eposPhp');
if ($conn->connect_error)   die('Greška pri povezivanju sa bazom: ' . $conn->connect_error);

$sql = "INSERT INTO Kompanije (maticni_broj, ime_kompanije, datum_unosa)
        VALUES ('$maticni_broj', '$ime_kompanije', '$datum_unosa')";

if ($conn->query($sql) === TRUE) {
} else {
    echo $conn->error;
}

$conn->close();






