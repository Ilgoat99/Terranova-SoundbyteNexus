var songs = [
    {
        audio: 'audio/My Name Is .mp3',
        options: ['My Name is', 'Slim Shady', 'Love the way you lie', 'Lose yourself', 'Not afraid'],
        correctAnswer: 0 // Indice della risposta corretta nell'array delle opzioni
    },
    {
        audio: 'audio/Lollipop .mp3',
        options: ['What do you mean', 'Slim Shady', 'Lollipop', 'Heartbreaker', 'Nevermind'],
        correctAnswer: 2 // Indice della risposta corretta nell'array delle opzioni
    },
    {
        audio: 'audio/1st of Tha Month .mp3',
        options: ['My Name is', 'Slim Shady', 'Love the way you lie', 'Lose yourself', 'Not afraid'],
        correctAnswer: 0 // Indice della risposta corretta nell'array delle opzioni
    },
    {
        audio: 'audio/A Milli .mp3',
        options: ['What do you mean', 'Slim Shady', 'Lollipop', 'Heartbreaker', 'Nevermind'],
        correctAnswer: 2 // Indice della risposta corretta nell'array delle opzioni
    },
    {
        audio: 'audio/Aint No Fun .mp3',
        options: ['My Name is', 'Slim Shady', 'Love the way you lie', 'Lose yourself', 'Not afraid'],
        correctAnswer: 0 // Indice della risposta corretta nell'array delle opzioni
    },
    {
        audio: 'audio/24s (Vocals Only) .mp3',
        options: ['What do you mean', 'Slim Shady', 'Lollipop', 'Heartbreaker', 'Nevermind'],
        correctAnswer: 2 // Indice della risposta corretta nell'array delle opzioni
    },
    {
        audio: 'audio/All Falls Down .mp3',
        options: ['My Name is', 'Slim Shady', 'Love the way you lie', 'Lose yourself', 'Not afraid'],
        correctAnswer: 0 // Indice della risposta corretta nell'array delle opzioni
    },
    {
        audio: 'audio/Ambitionz Az A Ridah .mp3',
        options: ['What do you mean', 'Slim Shady', 'Lollipop', 'Heartbreaker', 'Nevermind'],
        correctAnswer: 2 // Indice della risposta corretta nell'array delle opzioni
    },
    {
        audio: 'audio/Award Tour .mp3',
        options: ['My Name is', 'Slim Shady', 'Love the way you lie', 'Lose yourself', 'Not afraid'],
        correctAnswer: 0 // Indice della risposta corretta nell'array delle opzioni
    },
    {
        audio: 'audio/Best I Ever Had .mp3',
        options: ['What do you mean', 'Slim Shady', 'Lollipop', 'Heartbreaker', 'Nevermind'],
        correctAnswer: 2 // Indice della risposta corretta nell'array delle opzioni
    },
    {
        audio: 'audio/Big Pimpin .mp3',
        options: ['My Name is', 'Slim Shady', 'Love the way you lie', 'Lose yourself', 'Not afraid'],
        correctAnswer: 0 // Indice della risposta corretta nell'array delle opzioni
    },
    {
        audio: 'audio/Best I Ever Had .mp3',
        options: ['What do you mean', 'Slim Shady', 'Lollipop', 'Heartbreaker', 'Nevermind'],
        correctAnswer: 2 // Indice della risposta corretta nell'array delle opzioni
    },
    
];


var currentSongIndex = -1;
var score = 0;
var totalScore = 0;
var timerInterval;
var timeElapsed = 0;
var songCounter = 10; // Contatore delle canzoni

function showGame() {
    var gameContainer = document.getElementById('gameContainer');
    var songInfo = document.querySelector('.song-info');
    gameContainer.style.display = "block"; // Mostra il gameContainer
    songInfo.style.display = "block"; // Mostra il div song-info
}

function startGame() {
    var gameArea = document.getElementById('gameArea');
    gameArea.style.display = "block"; // Mostra il div gameArea

    var songInfo = document.querySelector('.song-info');
    songInfo.style.display = "none"; // Nasconde il div song-info

    if (songCounter > 0) {
        songCounter--; // Decrementa il contatore delle canzoni
    } else {
        endGame(); // Termina il gioco se il contatore è zero
        return;
    }

    var songIndex;
    do {
        songIndex = Math.floor(Math.random() * songs.length); // Scegli una canzone casualmente
    } while (songIndex === currentSongIndex); // Continua a selezionare una nuova canzone finché non è diversa dall'ultima

    currentSongIndex = songIndex; // Salva l'indice della nuova canzone

    var song = songs[songIndex];
   
    var audio = document.getElementById('audio');
    var optionsContainer = document.getElementById('options');
    var result = document.getElementById('result');
    var timerElement = document.getElementById('timer');
    var totalScoreElement = document.getElementById('totalScoreValue');
    

    // Resetta il timer e il conteggio dei secondi
    clearInterval(timerInterval);
    timeElapsed = 0;
    timerElement.textContent = 'Time: 0';

    songTitle.textContent = song.title;
    audio.src = song.audio;
    audio.controls = 0; // Visualizza i controlli, inclusi il pulsante di pausa
    
    audio.disabled = false; // Riattiva il pulsante di riproduzione
    audio.volume = 1; // Riattiva il suono

    // Rimuovi eventuali opzioni precedenti
    while (optionsContainer.firstChild) {
        optionsContainer.removeChild(optionsContainer.firstChild);
    }

    // Aggiungi nuove opzioni
    song.options.forEach(function(option, index) {
        var button = document.createElement('button');
        button.textContent = option;
        button.onclick = function() {
            checkGuess(index, song.correctAnswer, result);
            clearInterval(timerInterval); // Stop il timer quando viene data la risposta
        };
        button.disabled = true; // Disabilita il pulsante di risposta
        optionsContainer.appendChild(button);
    });

    // Gestione evento "canplaythrough" dell'audio
    audio.oncanplaythrough = function() {
        // Ritarda l'avvio della riproduzione della canzone di 3 secondi
        setTimeout(function() {
            // Avvia la riproduzione della canzone dopo 3 secondi
            audio.play();
            var optionButtons = document.querySelectorAll('#options button');
            optionButtons.forEach(function(button) {
                button.disabled = false;
            });
            
            // Avvia il timer dopo 3 secondi
            timerInterval = setInterval(function() {
                timeElapsed++;
                timerElement.textContent = 'Time: ' + timeElapsed;
            }, 1000);
        }, 3000);
    };

    // Quando l'audio termina, avvia una nuova canzone dopo un ritardo di 3 secondi
    audio.onended = function() {
        // Aggiorna il punteggio totale
        totalScore += score;
        totalScoreElement.textContent = totalScore;

        // Resetta il timer e il conteggio dei secondi
        clearInterval(timerInterval);
        timeElapsed = 0;
        timerElement.textContent = 'Time: 0';

        setTimeout(startGame, 3000); // Dopo 3 secondi, avvia una nuova canzone
    };
}



function endGame() {
    // Ferma la riproduzione dell'audio
    var audio = document.getElementById('audio');
    audio.pause();

    // Nasconde il campo di gioco
    var gameArea = document.getElementById('gameArea');
    gameArea.style.display = 'none';

    // Crea dinamicamente il div del riepilogo del gioco
    var gameSummaryDiv = document.createElement('div');
    gameSummaryDiv.id = 'gameSummary';
    gameSummaryDiv.innerHTML = '<h2>Game Summary</h2>' +
        '<p>Total Score: <span id="summaryTotalScore">' + totalScore + '</span></p>' +
        '<button id="replayButton" onclick="replayGame()">Replay</button>';
    
    // Inserisci il div del riepilogo del gioco nel body del documento
    document.body.appendChild(gameSummaryDiv);
}
function showGameSummary() {
    document.getElementById('gameArea').style.display = 'none'; // Nasconde il campo di gioco
    document.getElementById('gameSummary').style.display = 'block'; // Mostra il riepilogo del gioco
}

function replayGame() {
    document.getElementById('gameArea').style.display = 'block'; // Mostra nuovamente il campo di gioco
    document.getElementById('gameSummary').style.display = 'none'; // Nasconde il riepilogo del gioco


    // Nasconde il div del punteggio totale e il bottone replay
    var totalScoreContainer = document.getElementById('totalScore');
    totalScoreContainer.textContent = '';
    var replayButton = document.getElementById('replayButton');
    replayButton.style.display = 'none';

    // Resetta i valori e avvia una nuova partita
    score = 0;
    totalScore = 0;
    songCounter = 10;
    startGame();
}

function checkGuess(selectedIndex, correctIndex, resultElement) {
    var resultText;
    if (selectedIndex === correctIndex) {
        resultText = 'Correct!';
        score = 30 - timeElapsed; // Calcola il punteggio sottraendo il tempo trascorso da 30 secondi
        if (score < 0) {
            score = 0; // Imposta il punteggio a 0 se il tempo trascorso è superiore a 30 secondi
        }
        totalScore += score; // Aggiorna il punteggio totale
        document.getElementById('totalScoreValue').textContent = totalScore; // Aggiorna l'elemento HTML del punteggio totale
    } else {
        resultText = 'Wrong!';
    }
    resultElement.textContent = resultText;

    // Disattiva i bottoni delle opzioni
    var optionButtons = document.querySelectorAll('#options button');
    optionButtons.forEach(function(button) {
        button.disabled = true;
    });

    // Interrompi la riproduzione dell'audio corrente
    var audio = document.getElementById('audio');
    audio.pause();

    // Dopo aver dato la risposta, avvia una nuova canzone dopo un ritardo di 3 secondi
    startGame(); // Dopo 3 secondi, avvia una nuova canzone
}

// Avvia il gioco quando la pagina è completamente caricata
window.onload = function() {
    var gameArea = document.getElementById('gameArea');
    gameArea.style.display = "none";
};