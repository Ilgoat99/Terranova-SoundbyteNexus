var songs = [
    {
       
        audio: 'audio/My Name Is .mp3',
        options: ['My Name is', 'Slim Shady', 'Love the way you lie', 'Lose yourself', 'Not afraid'],
        correctAnswer: 0 // Indice della risposta corretta nell'array delle opzioni
    },
    {
        
        audio: 'audio/Lollipop .mp3',
        options: ['My Name is', 'Slim Shady', 'Love the way you lie', 'Lose yourself', 'Not afraid'],
        correctAnswer: 0 // Indice della risposta corretta nell'array delle opzioni
    },

];

var timerInterval;
var timeElapsed = 0;

function showGame() {
    var gameContainer = document.getElementById('gameContainer');
    gameContainer.classList.remove('hidden');
}

var lastSongIndex = -1; // Variabile per tenere traccia dell'indice dell'ultima canzone riprodotta

function startGame() {
    var gameArea = document.getElementById('gameArea');
    gameArea.classList.remove('hidden');

    var songIndex;
    do {
        songIndex = Math.floor(Math.random() * songs.length); // Scegli una canzone casualmente
    } while (songIndex === lastSongIndex); // Continua a selezionare una nuova canzone finché non è diversa dall'ultima

    lastSongIndex = songIndex; // Salva l'indice della nuova canzone

    var song = songs[songIndex];
    var songTitle = document.getElementById('songTitle');
    var audio = document.getElementById('audio');
    var optionsContainer = document.getElementById('options');
    var result = document.getElementById('result');
    var timerElement = document.getElementById('timer');

    // Resetta il timer e il conteggio dei secondi
    clearInterval(timerInterval);
    timeElapsed = 0;
    timerElement.textContent = 'Time: 0';

    songTitle.textContent = song.title;
    audio.src = song.audio;

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
    } else {
        resultText = 'Wrong!';
    }
    resultElement.textContent = resultText;

    // Interrompi la riproduzione dell'audio corrente
    var audio = document.getElementById('audio');
    audio.pause();

    // Dopo aver dato la risposta, avvia una nuova canzone dopo un ritardo di 3 secondi
    setTimeout(startGame, 3000); // Dopo 3 secondi, avvia una nuova canzone
}