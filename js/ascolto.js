

const quizButtons = document.querySelectorAll('.quiz button');
const gameContainer = document.querySelector('.container');

quizButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Nascondi tutti i quiz e mostra il riquadro del gioco principale
        document.querySelectorAll('.quiz').forEach(quiz => {
            quiz.style.display = 'none';
        });
        gameContainer.style.display = 'block';

        // Avvia il quiz corrispondente al pulsante cliccato
        const quizId = button.parentElement.id;
        fetchQuestions(quizId);
    });
});

const questionContainer = document.getElementById('question-container');
const answersContainer = document.getElementById('answers-container');
const resultContainer = document.getElementById('result');
const scoreContainer = document.getElementById('score-value');
const nextButton = document.getElementById('next-btn');
const replayButton = document.getElementById('replay-btn');
const closeButton = document.getElementById('close-btn');

let currentQuestionIndex = 0;
let questions = [];
let score = 0;

const quizTitles = {
  'quiz1': 'Easy',
  'quiz2': 'Medium ',
  'quiz3': 'Hard'
};

const quizColors = {
  'quiz1': '#0365d8', 
  'quiz2': '#7535dd', 
  'quiz3': '#000000'  
};

function fetchQuestions(quizId) {
    let difficulty;
    switch (quizId) {
        case 'quiz1':
            difficulty = 'easy';
            break;
        case 'quiz2':
            difficulty = 'medium';
            break;
        case 'quiz3':
            difficulty = 'hard';
            break;
        default:
            console.error('Invalid quiz ID');
            return;
    }
    
    // Setta il titolo del quiz e il colore
    const titleElement = document.querySelector('.container h2');
    titleElement.textContent = quizTitles[quizId];
    titleElement.style.color = quizColors[quizId];

    fetch(`https://opentdb.com/api.php?amount=10&category=12&difficulty=${difficulty}`)
        .then(response => response.json())
        .then(data => {
            questions = data.results.map(question => {
                question.answers = question.incorrect_answers.concat(question.correct_answer).map(answer => {
                    return { text: answer };
                });
                return question;
            });
            showQuestion();
            nextButton.style.display = 'inline-block';
            replayButton.style.display = 'none';
        });
}



function showQuestion() {
  const question = questions[currentQuestionIndex];
  questionContainer.innerHTML = decodeEntities(question.question);

  answersContainer.innerHTML = '';

  // Mischia le risposte
  const shuffledAnswers = shuffleArray(question.answers);

  shuffledAnswers.forEach(answer => {
      const answerButton = document.createElement('button');
      answerButton.classList.add('btn', 'answer-btn');
      answerButton.textContent = decodeEntities(answer.text);
      answerButton.addEventListener('click', () => {
          checkAnswer(answer.text);
      });
      answersContainer.appendChild(answerButton);
  });
}

// Funzione per mischiare un array (utilizzando l'algoritmo di Fisher-Yates)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function decodeEntities(encodedString) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = encodedString;
    return textarea.value;
}

function checkAnswer(selectedAnswer,userName,userEmail) {
    const correctAnswer = questions[currentQuestionIndex].correct_answer;

    if (selectedAnswer === correctAnswer) {
        resultContainer.textContent = 'Correct!';
        score++;
        scoreContainer.textContent = score;
    } else {
        resultContainer.textContent = 'Incorrect! The correct answer was: ' + correctAnswer;
    }

    const postData = {
        
        selectedAnswer: selectedAnswer,
        questionText: questions[currentQuestionIndex].question,
        userName: globalUserName,
        userEmail: globalUserEmail

    };

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'si.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            console.log(xhr.responseText);
        } else {
            console.error('Error:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Network Error');
    };

    xhr.send(JSON.stringify(postData));

    const answerButtons = document.querySelectorAll('.answer-btn');
    answerButtons.forEach(button => {
        button.disabled = true;
    });

    nextButton.disabled = false;
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
        resultContainer.textContent = '';

        const answerButtons = document.querySelectorAll('.answer-btn');
        answerButtons.forEach(button => {
            button.disabled = false;
        });

        nextButton.disabled = true;
    } else {
        endGame();
    }
});

replayButton.addEventListener('click', () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.textContent = score;
  resultContainer.textContent = '';
  const quizId = quizButtons[currentQuestionIndex].parentElement.id; // Ottieni l'ID del quiz attuale
  fetchQuestions(quizId); // Passa l'ID del quiz alla funzione fetchQuestions
});
closeButton.addEventListener('click', () => {
    gameContainer.style.display = 'none';
    document.querySelectorAll('.quiz').forEach(quiz => {
        quiz.style.display = 'flex';
    });
});
function endGame() {
    resultContainer.textContent = 'Quiz Finished!';
    nextButton.style.display = 'none';
    replayButton.style.display = 'inline-block';
}


const CLIENT_ID = 'bcef94d787dc4b9a96d6a84aa5ee8202';
const REDIRECT_URI = 'http://localhost/yurii/Terranova-SoundbyteNexus/terranova.html';
const SCOPES = ['user-read-private', 'user-read-email', 'user-top-read', 'playlist-read-private', 'playlist-read-collaborative', 'user-library-read'];
let accessToken;
let currentPreviewIndex = 0;
let currentAlbumId;

function authorizeSpotify() {
const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join('%20')}&response_type=token&show_dialog=true`;
window.location.href = url;
}

function logout() {
accessToken = null;
window.location.href = window.location.origin + window.location.pathname;
}

function handleAuthResponse() {
const hashParams = window.location.hash.substring(1).split('&');
const params = {};

for (let i = 0; i < hashParams.length; i++) {
  const [key, value] = hashParams[i].split('=');
  params[key] = decodeURIComponent(value);
}

if (params.access_token) {
  accessToken = params.access_token;
  document.getElementById('login-container').style.display = 'none';
   document.getElementById('user-info').style.display = 'block';
  getUserInfo();
  fetchPlaylists();
  getTopartists()
}
}


let globalUserEmail;
let globalUserName;


function getUserInfo() {
  fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
      },
  })
  .then(response => response.json())
  .then(data => {
      // Verifica se ci sono immagini dell'utente e visualizzale se presenti
      if (data.images.length > 0) {
          const profileImage = document.getElementById('profile-image');
          profileImage.innerHTML = `<img src="${data.images[0].url}" alt="Profile Image">`;
      }

      // Recupera il nome e l'email dell'utente
      globalUserName = data.display_name;
      globalUserEmail = data.email;

      
  })
  .catch(error => console.error('Errore durante la richiesta delle informazioni dell\'utente:', error));
}




function getTopartists() {
fetch('https://api.spotify.com/v1/me/top/artists?limit=5', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  },
})
.then(response => response.json())
.then(data => {
  const topAlbumsList = document.getElementById('top-albums');
  topAlbumsList.innerHTML = '';
  data.items.forEach(album => {
    const listItem = document.createElement('div');
    listItem.classList.add('album-container');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');

    const albumImage = document.createElement('img');
    albumImage.src = album.images[0].url;

    const nameContainer = document.createElement('div');
    nameContainer.classList.add('name-container');
    nameContainer.textContent = album.name;

    imageContainer.appendChild(albumImage);
    listItem.appendChild(imageContainer);
    listItem.appendChild(nameContainer);

    topAlbumsList.appendChild(listItem);
  });
})
.catch(error => console.error('Errore durante la richiesta degli album più ascoltati:', error));
}
function hideDiv() {
const div = document.getElementById('search-container');
div.style.display = 'none';
}

function fetchPlaylists() {
if (accessToken) {
  fetch('https://api.spotify.com/v1/me/playlists?limit=8', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  })
  .then(response => response.json())
  .then(data => {
    const playlistList = document.getElementById('playlist-list');
    playlistList.innerHTML = '';

    data.items.forEach(playlist => {
      const listItem = createPlaylistItem(playlist);
      playlistList.appendChild(listItem);
    });

    document.getElementById('playlists').style.display = 'block'; 
  })
  .catch(error => console.error('Error fetching playlists:', error));
}
}

function createPlaylistItem(playlist) {
const listItem = document.createElement('div');
listItem.className = 'playlist-item';

const playlistImage = createImage(playlist.images[0].url, playlist.name);
const playlistName = document.createElement('div');
playlistName.className = 'playlist-name';
playlistName.textContent = playlist.name;

listItem.appendChild(playlistImage);
listItem.appendChild(playlistName);

return listItem;
}

function viewPlaylist(playlistId) {
if (accessToken) {
  window.open(`https://open.spotify.com/playlist/${playlistId}`, '_blank');
}
}

function createImage(src, alt) {
const image = document.createElement('img');
image.className = 'track-image';
image.src = src;
image.alt = alt;
return image;
}





function searchTracks() {
const searchTerm = document.getElementById('search-input').value;
fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=6`, {
    method: 'GET',
    headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    },
})
.then(response => response.json())
.then(data => {
    const searchResultsList = document.getElementById('search-results');
    searchResultsList.innerHTML = '';

    for (let i = 0; i < Math.min(6, data.tracks.items.length); i++) {
        const track = data.tracks.items[i];
        const listItem = document.createElement('div');
        listItem.classList.add('song');
        listItem.innerHTML = `
            <img src="${track.album.images[0].url}" alt="${track.name}" width="50">
            ${track.name}
            <button class="playsong" onclick="playTrack('${track.preview_url}')"><i class='bx bx-play bx-md' style='color:#ffffff'  ></i></button>`;
        searchResultsList.appendChild(listItem);
        const div = document.getElementById('search-container');
        div.style.display = 'block';
    }
})

 


.catch(error => console.error('Error searching tracks:', error));
}





function playTrack(trackUrl) {
const audioPlayer = document.getElementById('audio-player');
audioPlayer.src = trackUrl;
audioPlayer.play();
}

const sunIcon = document.getElementById('sun');
const moonIcon = document.getElementById('moon');

sunIcon.addEventListener('click', () => {
if (!document.body.classList.contains('lightmode')) {
  document.body.classList.add('lightmode');
  sunIcon.style.display = 'none';
  moonIcon.style.display = 'inline';
} else {
  document.body.classList.remove('lightmode');
  sunIcon.style.display = 'inline';
  moonIcon.style.display = 'none';
}
});

moonIcon.addEventListener('click', () => {
if (document.body.classList.contains('lightmode')) {
  document.body.classList.remove('lightmode');
  sunIcon.style.display = 'inline';
  moonIcon.style.display = 'none';
} else {
  document.body.classList.add('lightmode');
  sunIcon.style.display = 'none';
  moonIcon.style.display = 'inline';
}
});

const playlistButton = document.getElementById('bottoneplaylist');
const playlistSection = document.getElementById('section-playlist');
const quizSection = document.getElementById('section-quiz');

playlistButton.addEventListener('click', () => {
playlistButton.style.display = 'none';
playlistSection.style.display = 'block';
quizSection.style.display = 'none';
document.getElementById('title-playlist').style.display = 'block';
document.getElementById('title-quiz').style.display = 'none';
document.getElementById('bottonequiz').style.display = 'block';

fetchPlaylists(); // Aggiungiamo questa chiamata per caricare le playlist quando si fa clic sul bottone
});

const quizButton = document.getElementById('bottonequiz');

quizButton.addEventListener('click', () => {
quizButton.style.display = 'none';
playlistSection.style.display = 'none';
quizSection.style.display = 'block';
document.getElementById('title-quiz').style.display = 'block';
document.getElementById('title-playlist').style.display = 'none';
document.getElementById('bottoneplaylist').style.display = 'block';
});


handleAuthResponse();

  // Aggiunge un event listener al bottone
  document.getElementById('buttone').addEventListener('click', function() {
    // Mostra l'overlay con animazione
    var overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    overlay.style.animationName = 'slideIn'; // Usa l'animazione slideIn
  });

  // Aggiunge un event listener al bottone di chiusura
  document.getElementById('closeButtone').addEventListener('click', function() {
    // Nasconde l'overlay con animazione
    var overlay = document.getElementById('overlay');
    overlay.style.animationName = 'slideOut'; // Usa l'animazione slideOut
    // Ritarda la chiusura dell'overlay per lasciare il tempo all'animazione di completarsi
    setTimeout(function() {
      overlay.style.display = 'none';
    }, 1000); // Tempo pari alla durata dell'animazione
    // Deseleziona il checkbox
    document.getElementById('button').checked = false;
  });




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
  var score1 = 0;
  var totalScore = 0;
  var timerInterval;
  var timeElapsed = 0;
  var songCounter = 10; // Contatore delle canzoni
  function showGame() {
    // Codice per mostrare il gioco
    var gameContainer = document.getElementById('gameContainer');
    gameContainer.style.display = "block"; // Mostra il gameContainer
    var songInfo = document.querySelector('.song-info');
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
    score1 = 0;
    totalScore = 0;
    songCounter = 10;
    startGame();
  }

  function checkGuess(selectedIndex, correctIndex, resultElement) {
    var resultText;
    if (selectedIndex === correctIndex) {
        resultText = 'Correct!';
        score1 = 30 - timeElapsed; // Calcola il punteggio sottraendo il tempo trascorso da 30 secondi
        if (score1 < 0) {
            score1 = 0; // Imposta il punteggio a 0 se il tempo trascorso è superiore a 30 secondi
        }
        totalScore += score1; // Aggiorna il punteggio totale
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