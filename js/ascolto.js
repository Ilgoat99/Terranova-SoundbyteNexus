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
    if (data.images.length > 0) {
      const profileImage = document.getElementById('profile-image');
      profileImage.innerHTML = `<img src="${data.images[0].url}" alt="Profile Image">`;
      
    }
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
