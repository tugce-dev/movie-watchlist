const apiKey = "f4691203";

const searcInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const movieResults = document.getElementById("movie-results");

searchBtn.addEventListener("click", searchMovies);

async function searchMovies() {
  const searchTerm = searcInput.value.trim();

if (!searchTerm) {
  return;
}
  const response = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`,
  );

  const data = await response.json();
  
  if (data.Response === "False") {
  movieResults.innerHTML = `
    <div class="empty-state">
      <span class="movie-icon">🎞️</span>
      <p>No movies found</p>
      <small>Try searching for another title.</small>
    </div>
  `;
  return;
}
  console.log(data);
  console.log(data.Search);

  movieResults.innerHTML = "";
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  for (const movie of data.Search) {
    const detailResponse = await fetch(
      `https://www.omdbapi.com/?apikey=${apiKey}&i=${movie.imdbID}`,
    );
    const movieDetails = await detailResponse.json();

    const isAdded = watchlist.includes(movieDetails.imdbID);

    movieResults.innerHTML += `
     <div class="movie-card">
<img src="${movieDetails.Poster}" alt="${movieDetails.Title} poster">            <div class="movie-info">
                <div class="movie-title-row">
        <h2>${movieDetails.Title}</h2>
        <span>⭐ ${movieDetails.imdbRating}</span>
    </div>
    <div class="movie-meta">
        <span>${movieDetails.Runtime}</span>
        <span>${movieDetails.Genre}</span>
            <button class="watchlist-btn" data-id="${movieDetails.imdbID}">
        ${isAdded ? "✓ Added" : "＋ Watchlist"}
    </button>
    </div>
    <p class="movie-plot">${movieDetails.Plot}</p>
            </div>
        </div>
        `;
  }
  const watchlistBtns = document.querySelectorAll(".watchlist-btn");

  watchlistBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
      if (!watchlist.includes(btn.dataset.id)) {
        watchlist.push(btn.dataset.id);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));

        btn.textContent = "✓ Added";
      }

      console.log(watchlist);
    });
  });
}
