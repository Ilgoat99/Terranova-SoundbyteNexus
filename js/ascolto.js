const CLIENT_ID = 'bcef94d787dc4b9a96d6a84aa5ee8202';
const REDIRECT_URI = 'http://localhost/yurii/Terranova-SoundbyteNexus/terranova.html';
const SCOPES = ['user-read-private', 'user-read-email', 'user-top-read'];
let accessToken;
let currentPreviewIndex = 0;
let currentAlbumId;

function authorizeSpotify() {
  const url = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join('%20')}&response_type=token&show_dialog=true`;
  window.location.href = url;
}

function logout() {
  // Rimuovi l'access token e reindirizza alla pagina di login
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
    document.getElementById('player-container').style.display = 'block';
    getUserInfo();
    getPreviewTrack();
    getTopTracks();
    getTopAlbums();
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

function getPreviewTrack() {
  fetch('https://api.spotify.com/v1/tracks/1xznGGDReH1oQq0xzbwXa3', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    document.getElementById('preview-track').innerHTML = `<audio controls id="audio-preview"><source src="${data.preview_url}" type="audio/mpeg"></audio>`;
  })
  .catch(error => console.error('Errore durante la richiesta di informazioni sul brano:', error));
}

function getTopTracks() {
  fetch('https://api.spotify.com/v1/me/top/tracks?limit=5', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    const topTracksList = document.getElementById('top-tracks');
    topTracksList.innerHTML = '';
    data.items.forEach(track => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img src="${track.album.images[0].url}" alt="${track.name}" width="50">
        ${track.name}
        <button onclick="playTrack('${track.preview_url}')">Ascolta</button>`;
      topTracksList.appendChild(listItem);
    });
  })
  .catch(error => console.error('Errore durante la richiesta dei brani più ascoltati:', error));
}

function getTopAlbums() {
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
    

listItem.innerHTML = `
  
    <div class="image-container">
      
      <img src="${album.images[0].url}"  width="50">
      <div class="name-container">
      ${album.name}
    </div>
    </div>
    
  </div>`;
topAlbumsList.appendChild(listItem);

    });
  })
  .catch(error => console.error('Errore durante la richiesta degli album più ascoltati:', error));
}

function playTrack(previewUrl) {
  document.getElementById('preview-track').innerHTML = `<audio controls id="audio-preview"><source src="${previewUrl}" type="audio/mpeg"></audio>`;
}

function showAlbumTracks(albumId) {
  currentAlbumId = albumId;
  fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(data => {
    const albumTracksList = document.getElementById('album-tracks');
    albumTracksList.innerHTML = '';
    data.items.forEach(track => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        ${track.track_number}. ${track.name}
        <button onclick="playTrack('${track.preview_url}')">Ascolta</button>`;
      albumTracksList.appendChild(listItem);
    });
  })
  .catch(error => console.error('Errore durante la richiesta delle tracce dell\'album:', error));
}

function changeTrack(offset) {
  if (currentAlbumId) {
    // Se si sta ascoltando un album, gestisci il cambio di traccia all'interno dell'album
    currentPreviewIndex += offset;
    if (currentPreviewIndex < 0) {
      currentPreviewIndex = 0;
    } else if (currentPreviewIndex >= albumTracksList.length) {
      currentPreviewIndex = albumTracksList.length - 1;
    }
    const previewUrl = albumTracksList[currentPreviewIndex].preview_url;
    document.getElementById('audio-preview').src = previewUrl;
  }
}

function searchTracks() {
  const searchTerm = document.getElementById('search-input').value;
  fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track&limit=5`, {
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
    data.tracks.items.forEach(track => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <img src="${track.album.images[0].url}" alt="${track.name}" width="50">
        ${track.name}
        <button onclick="playTrack('${track.preview_url}')">Ascolta</button>`;
      searchResultsList.appendChild(listItem);
    });
  })
  .catch(error => console.error('Errore durante la ricerca di brani:', error));
}

handleAuthResponse();