Code
JS
JavaScript
// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQD1WeLiPsRNaXkiB6mUlRUp6ROTQFW2CpIhl15_SqoFroFFP3lHvPTmUM3LgP-nycPvu34OBLkhzsbGYJCHHfFBrc8V3uxN2fumkKpD_ix607eTcAO-OexWXOM1Sw1HIHRKtZBd4wo8fkj-h_r6YQXBqtNrwOhibfDs5tpCppQT8OPMCftdtZ203QsyUjATYYAQpQq6iHw0lMi-277gCqkHW-HnkBuHSKtJksOoOrp0GDLSOYFi89HoV47ILK2V1kRdkzzwnur9yuHkHM1Df-U1';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

const tracksUri = [
  'spotify:track:2TMF4ZxPrOncQiJ9KVXD3f','spotify:track:6wdpb17i1FDIexi6x1vTke','spotify:track:1nd1TVQjVxYI5LddwJ0prH','spotify:track:6GMyR5UghG6k4MpsXsaim8','spotify:track:70AgFaB146MYf6cylc1hoS','spotify:track:4vYvY3M4ZtJrS03KqtjYUv','spotify:track:0ksqA7waEGNDkGkmRz0Gwj','spotify:track:1M7CwtrWZ24mopNdDPB3DM','spotify:track:0nkTwVdqsIZPNUcKSyXM67','spotify:track:6S4fXKcUSbiGEIHOXSeSaD'
];

async function createPlaylist(tracksUri){
  const { id: user_id } = await fetchWebApi('v1/me', 'GET')

  const playlist = await fetchWebApi(
    `v1/users/${user_id}/playlists`, 'POST', {
      "name": "My recommendation playlist",
      "description": "Playlist created by the tutorial on developer.spotify.com",
      "public": false
  })

  await fetchWebApi(
    `v1/playlists/${playlist.id}/tracks?uris=${tracksUri.join(',')}`,
    'POST'
  );

  return playlist;
}

const createdPlaylist = await createPlaylist(tracksUri);
console.log(createdPlaylist.name, createdPlaylist.id);