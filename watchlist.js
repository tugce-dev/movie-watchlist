const apiKey = "f4691203";

const watchlistResults = document.getElementById("watchlist-results");

const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

console.log(watchlist);
async function renderWatchlist() {
  watchlistResults.innerHTML = "";
  if (watchlist.length === 0) {
    watchlistResults.innerHTML = `
      <div class="empty-state">
        <span class="movie-icon">🎞️</span>
        <p>Your watchlist is looking a little empty...</p>
        <a href="index.html">＋ Let's add some movies!</a>
      </div>
    `;

    return;
  }

  for (const imdbID of watchlist) {
    const response = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`,
    );

    const movie = await response.json();

    console.log(movie);
    watchlistResults.innerHTML += `

    <div class="movie-card">
        <img src="${movie.Poster}" alt="${movie.Title} poster">
        <div class="movie-info">
            <div class="movie-title-row">
                <h2>${movie.Title}</h2>
                <span>⭐ ${movie.imdbRating}</span>
            </div>
            <div class="movie-meta">
                <span>${movie.Runtime}</span>
                <span>${movie.Genre}</span>
                <button class="remove-btn" data-id="${movie.imdbID}">
                    − Remove
                </button>
            </div>
            <p class="movie-plot">${movie.Plot}</p>
        </div>
    </div>

`;
  }
  const removeBtns = document.querySelectorAll(".remove-btn");

  removeBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const updatedWatchlist = watchlist.filter(function (id) {
        return id !== btn.dataset.id;
      });

      localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));

      location.reload();
    });
  });
}

renderWatchlist();
