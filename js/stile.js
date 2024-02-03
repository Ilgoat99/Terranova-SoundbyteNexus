const clientId = 'bcef94d787dc4b9a96d6a84aa5ee8202';
    const redirectUri = 'http://localhost/yurii/Terranova-SoundbyteNexus/terranova.html';
    const scope = 'user-read-private user-read-email';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token&show_dialog=true`;

    document.getElementById('loginButton').addEventListener('click', () => {
      window.location.href = authUrl;
    });

    // Funzione per ottenere il token dall'URL
    function getAccessTokenFromUrl() {
      const hashParams = window.location.hash.substring(1).split('&');
      for (let i = 0; i < hashParams.length; i++) {
        const [key, value] = hashParams[i].split('=');
        if (key === 'access_token') {
          return value;
        }
      }
      return null;
    }

    const accessToken = getAccessTokenFromUrl();

    if (accessToken) {
      // Nasconde il pulsante di accesso e mostra il modulo di ricerca
      document.getElementById('loginButton').style.display = 'none';
      document.getElementById('searchForm').style.display = 'block';

      // Funzione per gestire la ricerca di brani
      document.getElementById('searchForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchTerm = document.getElementById('searchInput').value;

        // Effettua la chiamata API di Spotify per la ricerca di brani
        const apiUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchTerm)}&type=track`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });

        const data = await response.json();
        const searchResults = data.tracks.items;

        // Visualizza i risultati della ricerca
        const resultsContainer = document.getElementById('searchResults');
        resultsContainer.innerHTML = '';

        if (searchResults.length > 0) {
          searchResults.forEach((track) => {
            const trackContainer = document.createElement('div');
            trackContainer.classList.add('track-container');

            const imageElement = document.createElement('img');
            imageElement.src = track.album.images[0].url;
            imageElement.alt = 'Album Cover';
            imageElement.width = 64;
            imageElement.height = 64;
            trackContainer.appendChild(imageElement);

            const trackInfoContainer = document.createElement('div');
            trackInfoContainer.classList.add('track-info');

            const trackNameElement = document.createElement('p');
            trackNameElement.textContent = `Track: ${track.name}`;

            const artistNameElement = document.createElement('p');
            artistNameElement.textContent = `Artist: ${track.artists.map(artist => artist.name).join(', ')}`;

            trackInfoContainer.appendChild(trackNameElement);
            trackInfoContainer.appendChild(artistNameElement);

            trackContainer.appendChild(trackInfoContainer);

            const audioContainer = document.createElement('div');
            audioContainer.classList.add('audio-container');

            const audioElement = document.createElement('audio');
            audioElement.controls = true;
            audioElement.innerHTML = `
              <source src="${track.preview_url}" type="audio/mpeg">
              Your browser does not support the audio tag.
            `;

            audioContainer.appendChild(audioElement);

            trackContainer.appendChild(audioContainer);

            resultsContainer.appendChild(trackContainer);
          });
        } else {
          resultsContainer.innerHTML = '<p>Nessun risultato trovato</p>';
        }
      });
    }