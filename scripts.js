const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual TMDB API key

const movieGrid = document.getElementById('movie-grid');
const seriesGrid = document.getElementById('series-grid');
const searchBar = document.getElementById('searchBar');  
const searchResults = document.getElementById('searchResults');  
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modal-content');
const closeModal = document.getElementById('close-modal');

async function fetchMovies() {
  const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`);
  const data = await response.json();
  
  data.results.forEach((movie) => {
    const movieCard = document.createElement('div');
    movieCard.className = 'movie-card';
    
    movieCard.innerHTML = `
      <div class="movie-poster">
        <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}" class="movie-image">
        <div class="rating-container">
          <div class="rating-number">${movie.vote_average}</div>
        </div>
        <button onclick="openMovieModal(${movie.id}, '${movie.title}')">Watch Now</button>
      </div>
    `;
    
    movieGrid.appendChild(movieCard);
  });
}

function openMovieModal(movieId, movieTitle) {
    modal.style.display = 'block';
    modalContent.innerHTML = `
      <h2>${movieTitle}</h2>
      <iframe id="movieFrame" src="https://moviebox.ph/embed/${movieId}" frameborder="0" allowfullscreen></iframe>
      <select id="serverSelect" onchange="changeServer(${movieId})">
        <option value="https://moviebox.ph/embed/${movieId}">Server 1</option>
        <option value="https://moviebox.ph/embed2/${movieId}">Server 2</option>
        <option value="https://moviebox.ph/embed3/${movieId}">Server 3</option>
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
