# 🎬 Movie Watchlist

🔗 **Live Demo:** [View Movie Watchlist](https://movie-watchlist-tc.netlify.app/)

A responsive movie search and watchlist application built with **vanilla JavaScript** and the **OMDb API**.

Users can search for movies, view detailed information about each result, and save movies to a personal watchlist that persists between browser sessions.

---

## ✨ Features

- 🔎 Search for movies by title
- 🎬 Fetch real-time movie data from the OMDb API
- ⭐ Display IMDb ratings
- ⏱️ Display runtime and genre information
- 📝 Show movie plot summaries
- ➕ Add movies to a personal watchlist
- ✅ Prevent duplicate movies from being added
- 💾 Persist the watchlist using Local Storage
- ➖ Remove movies from the watchlist
- 🔄 Keep saved movies after refreshing or reopening the page
- 🔍 Display a helpful message when no movies are found
- 🎞️ Empty-state UI for an empty watchlist
- 📱 Responsive, dark-themed movie interface

---

## 🛠️ Built With

- **HTML5**
- **CSS3**
- **JavaScript (ES6+)**
- **OMDb API**
- **Local Storage**
- **Async/Await**
- **Fetch API**

No frameworks or external JavaScript libraries were used.

---

## ⚙️ How It Works

### Movie Search

The application sends a request to the OMDb API using the user's search term:

```javascript
const response = await fetch(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchTerm}`
)

const data = await response.json()
```

The initial search response provides basic movie information and IMDb IDs.

The application then uses each movie's IMDb ID to request additional details such as:

- IMDb rating
- Runtime
- Genre
- Plot
- Poster

This data is dynamically rendered into the page using JavaScript.

### Watchlist

Each movie has its IMDb ID stored in a custom `data-id` attribute:

```html
<button class="watchlist-btn" data-id="${movieDetails.imdbID}">
    + Watchlist
</button>
```

When a movie is added, its IMDb ID is stored in an array and saved to the browser's Local Storage:

```javascript
localStorage.setItem("watchlist", JSON.stringify(watchlist))
```

When the watchlist page loads, the stored data is converted back into a JavaScript array:

```javascript
const watchlist =
    JSON.parse(localStorage.getItem("watchlist")) || []
```

The app then fetches the corresponding movie information from the OMDb API and renders the saved movies.

Movies can also be removed from the watchlist, with Local Storage updated immediately.

---

## 🧠 JavaScript Concepts Practiced

This project helped reinforce several core JavaScript concepts:

- Working with external APIs
- `fetch()`
- Promises
- `async` / `await`
- JSON data
- DOM manipulation
- Event listeners
- Template literals
- `for...of` loops
- Arrays and array methods
- `filter()`
- `includes()`
- Custom `data-*` attributes
- Local Storage
- `JSON.stringify()`
- `JSON.parse()`
- Conditional rendering
- Handling API responses and empty states

---

## 💾 Persistent Watchlist

The watchlist is stored in the user's browser using Local Storage.

This means saved movies remain available even after:

- Refreshing the page
- Navigating between the search and watchlist pages
- Closing and reopening the browser

Duplicate IMDb IDs are prevented from being added to the watchlist.

---

## 🎯 What I Learned

Building Movie Watchlist gave me hands-on experience combining several parts of frontend development into one complete application.

Rather than working with static data, I practiced fetching data asynchronously from an external API, using IDs to make additional API requests, dynamically generating UI from API responses, and maintaining application state across multiple pages with Local Storage.

The project also strengthened my understanding of the relationship between API data, JavaScript state, and the DOM.

---

## 🚀 Future Improvements

Possible improvements for future versions include:

- Search by pressing Enter
- Loading indicators while API requests are running
- Improved API/network error handling
- Movie filtering and sorting
- Pagination for additional search results

---

## 👩‍💻 Author

**Tuğçe Çırak**

Software Engineer focused on full-stack development.
