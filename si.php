<?php
// Connessione al database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "prova4";

// Creazione della connessione
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica della connessione
if ($conn->connect_error) {
    die("Connessione al database fallita: " . $conn->connect_error);
}

// Ricezione dei dati inviati tramite POST
$inputJSON = file_get_contents('php://input');
$input = json_decode($inputJSON, true);

// Controllo se i dati sono stati ricevuti correttamente
if (!empty($input)) {
    $questionId = $input['questionId'];
    $selectedAnswer = $input['selectedAnswer'];
    $questionText = $input['questionText'];
    $userName = $input['userName'];
    $userEmail = $input['userEmail'];

    // Controllo se l'utente esiste già nel database
    $sqlCheckUser = "SELECT id_utente FROM utente WHERE mail = ?";
    $stmtCheckUser = $conn->prepare($sqlCheckUser);
    $stmtCheckUser->bind_param("s", $userEmail);
    $stmtCheckUser->execute();
    $resultCheckUser = $stmtCheckUser->get_result();

    if ($resultCheckUser->num_rows > 0) {
        // L'utente è già presente nel database, non è necessario inserirlo nuovamente
        $row = $resultCheckUser->fetch_assoc();
        $userId = $row['id_utente'];
    } else {
        // L'utente non è presente nel database, quindi lo inseriamo
        $sqlInsertUser = "INSERT INTO utente (nome, mail) VALUES (?, ?)";
        $stmtInsertUser = $conn->prepare($sqlInsertUser);
        $stmtInsertUser->bind_param("ss", $userName, $userEmail);

        if ($stmtInsertUser->execute()) {
            $userId = $stmtInsertUser->insert_id;
        } else {
            echo "Errore durante il salvataggio dell'utente nel database: " . $stmtInsertUser->error;
        }

        $stmtInsertUser->close();
    }

  // Controllo se la domanda esiste già nel database
  $sqlCheckQuestion = "SELECT id_domanda FROM domanda WHERE testo_domanda = ?";
  $stmtCheckQuestion = $conn->prepare($sqlCheckQuestion);
  $stmtCheckQuestion->bind_param("s", $questionText);
  $stmtCheckQuestion->execute();
  $resultCheckQuestion = $stmtCheckQuestion->get_result();

  if ($resultCheckQuestion->num_rows > 0) {
      // La domanda è già presente nel database, non è necessario inserirla nuovamente
      $row = $resultCheckQuestion->fetch_assoc();
      $questionId = $row['id_domanda'];
  } else {
      // La domanda non è presente nel database, quindi la inseriamo
      $sqlInsertQuestion = "INSERT INTO domanda (testo_domanda) VALUES (?)";
      $stmtInsertQuestion = $conn->prepare($sqlInsertQuestion);
      $stmtInsertQuestion->bind_param("s", $questionText);

      if ($stmtInsertQuestion->execute()) {
          $questionId = $stmtInsertQuestion->insert_id;
      } else {
          echo "Errore durante il salvataggio della domanda nel database: " . $stmtInsertQuestion->error;
      }

      $stmtInsertQuestion->close();
  }

    // Inserimento della risposta nel database associata all'utente e alla domanda
    $sqlInsertAnswer = "INSERT INTO risposta (id_domanda, id_utente, testo_risposta) VALUES (?, ?, ?)";
    $stmtInsertAnswer = $conn->prepare($sqlInsertAnswer);
    $stmtInsertAnswer->bind_param("iis", $questionId, $userId, $selectedAnswer);

    if ($stmtInsertAnswer->execute()) {
        echo "Domanda, risposta e utente salvati con successo nel database!";
    } else {
        echo "Errore durante il salvataggio della risposta nel database: " . $stmtInsertAnswer->error;
    }

    $stmtInsertAnswer->close();
} else {
    echo "Nessun dato ricevuto dal frontend.";
}

// Chiudi la connessione al database
$conn->close();
?>