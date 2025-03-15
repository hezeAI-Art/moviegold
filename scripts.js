const API_KEY = 'YOUR_TMDB_API_KEY'; // Replace with your actual TMDB API key

const movieGrid = document.getElementById('movie-grid');
const seriesGrid = document.getElementById('series-grid');
const searchBar = document.getElementById('searchBar');  
const searchResults = document.getElementById('searchResults');  

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
      </div>
    `;
    
    movieCard.onclick = () => openMovieModal(movie.id);
    movieGrid.appendChild(movieCard);
  });
}

async function fetchSeries() {
    const response = await fetch(`https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`);
    const data = await response.json();
  
    seriesGrid.innerHTML = ''; 
  
    data.results.forEach((series) => {
      const seriesCard = document.createElement('div');
      seriesCard.className = 'series-card';
  
      seriesCard.innerHTML = `
        <div class="series-poster">
          <img src="https://image.tmdb.org/t/p/w500/${series.poster_path}" alt="${series.name}" class="series-image">
          <div class="rating-container">
            <div class="rating-number">${series.vote_average}</div>
          </div>
        </div>
      `;
  
      seriesCard.onclick = () => openSeriesModal(series.id);
      seriesGrid.appendChild(seriesCard);
    });
  }

async function searchMoviesAndSeries(query) {
  try {
    searchResults.innerHTML = ''; 

    const movieResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const movieData = await movieResponse.json();

    const seriesResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const seriesData = await seriesResponse.json();

    if (movieData.results.length > 0) {
      renderSearchResults(movieData.results, 'movie');
    }

    if (seriesData.results.length > 0) {
      renderSearchResults(seriesData.results, 'series');
    }

  } catch (error) {
    console.error('Error fetching search results:', error);
    searchResults.innerHTML = `<p>Something went wrong. Please try again.</p>`;
  }
}

searchBar.addEventListener('input', (e) => {
  const query = e.target.value.trim();
  searchResults.innerHTML = ''; 
  if (query) {
    searchMoviesAndSeries(query); 
  }
});

window.onload = () => {
  fetchMovies();
  fetchSeries();
};
