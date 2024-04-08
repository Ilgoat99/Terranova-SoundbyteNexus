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
    }
];

var currentSongIndex = -1;
var score = 0;
var totalScore = 0;
var timerInterval;
var timeElapsed = 0;

function showGame() {
    var gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = "block";
}

function startGame() {
    var gameArea = document.getElementById('gameArea');
    gameArea.style.display = "block";

    var songInfo = document.querySelector('.song-info');
    songInfo.style.display = "none"; // Nasconde il div song-info

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
        optionsContainer.appendChild(button);
    });

    // Gestione evento "canplaythrough" dell'audio
    audio.oncanplaythrough = function() {
        // Avvia la riproduzione della canzone
        audio.play();

        // Avvia il timer contemporaneamente
        timerInterval = setInterval(function() {
            timeElapsed++;
            timerElement.textContent = 'Time: ' + timeElapsed;
        }, 1000);
    };

    // Quando l'audio termina, seleziona e avvia una nuova canzone dopo un ritardo di 3 secondi
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
    setTimeout(startGame, 3000); // Dopo 3 secondi, avvia una nuova canzone
}