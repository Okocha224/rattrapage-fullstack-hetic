function pickRandom(array, count) {
  const shuffled = array.slice().sort(function () {
    return 0.5 - Math.random();
  });
  return shuffled.slice(0, count);
}

function getGenres(callback) {
  fetch("https://api.deezer.com/genre")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const genres = data.data || [];
      callback(null, genres);
    })
    .catch(function (err) {
      callback(err, null);
    });
}

function getTracksByGenreId(genreId, callback) {
  const url = "https://api.deezer.com/chart/" + genreId + "/tracks";

  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      const tracks = data.data || [];
      const randomTracks = pickRandom(tracks, 5);
      callback(null, randomTracks);
    })
    .catch(function (err) {
      callback(err, null);
    });
}

module.exports = { getGenres, getTracksByGenreId };