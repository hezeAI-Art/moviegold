const API_KEY = 'e1f0ea6bd4624b907cd5abe3612a5321'; // Your actual TMDB API key

const movieGrid = document.getElementById('movie-grid');
const searchBar = document.getElementById('searchBar');  
const searchResults = document.getElementById('searchResults');  
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');

async function fetchMovies() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`);
    const data = await response.json();
    
    movieGrid.innerHTML = ''; // Clear previous data

    data.results.forEach((movie) => {
      const movieCard = document.createElement('div');
      movieCard.className = 'movie-card';

      movieCard.innerHTML = `
        <div class="movie-poster">
          <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="movie-image">
          <div class="rating-container">
            <div class="rating-number">${movie.vote_average.toFixed(1)}</div>
          </div>
          <button onclick="openMovieModal(${movie.id}, '${movie.title}')">Watch Now</button>
        </div>
      `;

      movieGrid.appendChild(movieCard);
    });
  } catch (error) {
    console.error("Error fetching movies:", error);
  }
}

function openMovieModal(movieId, movieTitle) {
  modal.style.display = 'block';

  modalContent.innerHTML = `
    <h2>${movieTitle}</h2>
    <iframe id="movieFrame" src="https://vidsrc.to/embed/movie/${movieId}" frameborder="0" allowfullscreen></iframe>
    <select id="serverSelect" onchange="changeServer(${movieId})">
      <option value="https://vidsrc.to/embed/movie/${movieId}">VidSrc</option>
      <option value="https://2embed.cc/embed/${movieId}">2Embed</option>
      <option value="https://multiembed.mov/embed/${movieId}">MultiEmbed</option>
    </select>
  `;
}

function changeServer(movieId) {
  const serverSelect = document.getElementById('serverSelect').value;
  document.getElementById('movieFrame').src = serverSelect;
}

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  modalContent.innerHTML = '';
});

window.onload = () => {
  fetchMovies();
};
