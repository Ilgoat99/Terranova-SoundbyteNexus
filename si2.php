<?php
// Connessione al database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prova3";

// Verifica della connessione
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Ottieni i dati inviati dal client
$userName = $_POST['userName'];
$userEmail = $_POST['userEmail'];

// Inserisci i dati dell'utente se non esistono già
$userInsertStmt = $conn->prepare("INSERT INTO utente (nome, mail) VALUES (?, ?)");
$userInsertStmt->bind_param("ss", $userName, $userEmail);
$userInsertStmt->execute();
$userInsertStmt->close();

// Chiudi la connessione al database
$conn->close();

// Invia una conferma di successo al client
echo "Dati dell'utente inseriti correttamente nel database.";
?>