const genreSelect = document.getElementById("genre-select");
const genreForm = document.getElementById("genre-form");
const tracksSection = document.getElementById("tracks-section");

fetch("/music/genres")
  .then(function (response) {
    return response.json();
  })
  .then(function (genres) {
    genreSelect.innerHTML = "";

    genres.forEach(function (genre) {
      if (genre.id === 0) {
        return;
      }

      const option = document.createElement("option");
      option.value = genre.id;
      option.textContent = genre.name;
      genreSelect.appendChild(option);
    });
  })
  .catch(function (err) {
    genreSelect.innerHTML = "<option value=''>Erreur de chargement</option>";
  });

genreForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const genreId = genreSelect.value;
  tracksSection.innerHTML = "Chargement...";

  fetch("/music/tracks/" + genreId)
    .then(function (response) {
      return response.json();
    })
    .then(function (tracks) {
      tracksSection.innerHTML = "";

      if (tracks.length === 0) {
        tracksSection.innerHTML = "Aucun morceau trouvé, réessaie dans quelques secondes.";
        return;
      }

      tracks.forEach(function (track) {
        const trackCard = document.createElement("div");
        trackCard.className = "track-card";

        const audioHtml = track.preview
          ? `<audio src="${track.preview}" controls></audio>`
          : `<p class="no-preview">Aperçu non disponible</p>`;

        trackCard.innerHTML = `
          <img src="${track.album.cover_medium}" alt="${track.title}">
          <p class="track-title">${track.title}</p>
          <p class="track-artist">${track.artist.name}</p>
          ${audioHtml}
        `;

        tracksSection.appendChild(trackCard);
      });
    })
    .catch(function (err) {
      tracksSection.innerHTML = "Erreur lors de la récupération des morceaux";
    });
});