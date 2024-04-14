<?php
// Connessione al database
$servername = "localhost";
$username = "root"; // Inserisci il tuo username del database
$password = ""; // Inserisci la tua password del database
$dbname = "spotiquiz"; // Inserisci il nome del tuo database

// Crea la connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la connessione
if ($conn->connect_error) {
    die("Connessione fallita: " . $conn->connect_error);
}

// Ottieni i dati POST inviati dal client
$data = json_decode(file_get_contents('php://input'), true);

// Estrai i dati
$selectedAnswer = $data['selectedAnswer'];
$questionText = $data['questionText'];
$userName = $data['userName'];
$userEmail = $data['userEmail'];

// Verifica che il nome e l'email non siano vuoti
if (!empty($userName) && !empty($userEmail)) {
    // Prepara e esegui l'inserimento dei dati nella tabella utente se non esiste già
    $stmt_user = $conn->prepare("INSERT IGNORE INTO utente (nome, mail) VALUES (?, ?)");
    $stmt_user->bind_param("ss", $userName, $userEmail);
    $stmt_user->execute();

    // Prepara e esegui l'inserimento dei dati nella tabella domanda se non esiste già
    $stmt_domanda = $conn->prepare("INSERT IGNORE INTO domanda (testo_domanda) VALUES (?)");
    $stmt_domanda->bind_param("s", $questionText);
    $stmt_domanda->execute();

    // Prepara e esegui l'inserimento dei dati nella tabella risposta
    $stmt_risposta = $conn->prepare("INSERT INTO risposta (testo_risposta, mail_utente, id_domanda) VALUES (?, ?, ?)");

    // Ottieni l'ID della domanda associata al testo della domanda
    $stmt_get_domanda_id = $conn->prepare("SELECT id_domanda FROM domanda WHERE testo_domanda = ?");
    $stmt_get_domanda_id->bind_param("s", $questionText);
    $stmt_get_domanda_id->execute();
    $stmt_get_domanda_id->store_result();
    $stmt_get_domanda_id->bind_result($domanda_id);
    $stmt_get_domanda_id->fetch();

    // Esegui l'inserimento dei dati nella tabella risposta
    $stmt_risposta->bind_param("ssi", $selectedAnswer, $userEmail, $domanda_id);
    $stmt_risposta->execute();

    // Verifica se l'inserimento è stato eseguito con successo
    if ($stmt_risposta->affected_rows > 0) {
        echo "Dati inseriti correttamente nel database.";
    } else {
        echo "Errore nell'inserimento dei dati nel database.";
    }

    // Chiudi le connessioni e le istruzioni preparate
    $stmt_user->close();
    $stmt_domanda->close();
    $stmt_risposta->close();
    $stmt_get_domanda_id->close();
} else {
    echo "Il nome e l'email non possono essere vuoti.";
}

$conn->close();
?>