<?php
$conn = new mysqli('ftp.milev051.mycpanel.rs', 'milev051_eposUser', 'eposPassword', 'milev051_eposPhp');
if ($conn->connect_error)   die('Greška pri povezivanju sa bazom: ' . $conn->connect_error);

$sql = "SELECT * FROM Kompanije";
$result = $conn->query($sql);

$kompanije = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $kompanije[] = $row;
    }
}

echo json_encode($kompanije);

$conn->close();




