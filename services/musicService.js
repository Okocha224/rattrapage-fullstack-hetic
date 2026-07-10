function pickRandom(array, count) {
  const shuffled = array.slice().sort(function () {
    return 0.5 - Math.random();
  });
  return shuffled.slice(0, count);
}

function getGenres(callback) {
  console.log("Appel à Deezer : récupération de la liste des styles...");

  fetch("https://api.deezer.com/genre")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const genres = data.data || [];
      console.log(genres.length + " styles reçus de Deezer");
      callback(null, genres);
    })
    .catch(function (err) {
      console.log("Erreur lors de la récupération des styles :", err.message);
      callback(err, null);
    });
}

function getTracksByGenreId(genreId, callback) {
  console.log("Appel à Deezer : morceaux pour le style id " + genreId + "...");

  const url = "https://api.deezer.com/chart/" + genreId + "/tracks";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const tracks = data.data || [];
      console.log(tracks.length + " morceaux reçus de Deezer pour ce style");

      const randomTracks = pickRandom(tracks, 5);
      console.log("5 morceaux sélectionnés au hasard :");
      randomTracks.forEach(function (track) {
        console.log("  - " + track.title + " (" + track.artist.name + ")");
      });

      callback(null, randomTracks);
    })
    .catch(function (err) {
      console.log("Erreur lors de la récupération des morceaux :", err.message);
      callback(err, null);
    });
}

module.exports = { getGenres, getTracksByGenreId };