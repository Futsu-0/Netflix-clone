window.addEventListener("scroll", function() {
    const topDashboard = document.querySelector('.top-dashboard');
    
    // Get the current scroll position
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Calculate the opacity based on scroll. You can adjust '300' for fading speed.
    const maxScroll = 300; // Scroll distance at which the element will disappear
    const opacity = Math.max(1 - scrollTop / maxScroll, 0);
    
    // Apply the calculated opacity to the top-dashboard
    topDashboard.style.opacity = opacity;
});


document.getElementById('menuButton').addEventListener('click', function(){
   const menuContainer = document.getElementById('menuContainer');
   
 if(menuContainer.innerHTML.trim()=== ""){
      fetch('Menu.html')
      .then(response => response.text())
      .then(data => {
        menuContainer.innerHTML = data;
        menuContainer.style.display= 'block';
        document.body.style.overflow = 'hidden'
      })
      
 }
      
    else{
      menuContainer.style.display = menuContainer.style.display === 'block' ? 'none' : 'block';
      if (menuContainer.style.display === 'block') {
            document.body.style.overflow = 'hidden'; // Prevent body scrolling
        } else {
            document.body.style.overflow = ''; // Allow body scrolling
    }
    }
});


 const API_KEY = 'api_key=9068b1583036f1f026a92bc56c96058a';
 const BASE_URL = 'https://api.themoviedb.org/3';
 const MOVIES_API_URL = BASE_URL + '/trending/movie/week?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&'+API_KEY;
 const TVSHOWS_API_URL = BASE_URL + '/trending/tv/week?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&'+API_KEY;
 const ANIME_API_URL = BASE_URL + '/discover/tv?with_genres=16&language=en-US&sort_by=popularity.desc&' + API_KEY;
 const HIGHEST_RATED_MOVIES_API_URL = BASE_URL + '/discover/movie?sort_by=vote_average.desc&vote_count.gte=1000&language=en-US&' + API_KEY;
 const HIGHEST_RATED_SHOWS_API_URL = BASE_URL + '/discover/tv?sort_by=vote_average.desc&vote_count.gte=1000&language=en-US&' + API_KEY;
 const TRENDING_MOVIES_API = BASE_URL + '/trending/movie/day?' + API_KEY;
 const MAIN_POSTER_IMG_URL = 'https://image.tmdb.org/t/p/original';
 const IMG_URL = 'https://image.tmdb.org/t/p/w500';
 
 getMainPoster();
 getMainPosterWithCycle();
 getMovies(MOVIES_API_URL);
 getTVShows(TVSHOWS_API_URL);
 getAnime(ANIME_API_URL);
 getHighestRatedMovies(HIGHEST_RATED_MOVIES_API_URL);
 getHighestRatedShows(HIGHEST_RATED_SHOWS_API_URL);
 


// Fetch the first TMDb image for the main poster
function getMainPoster() {
  fetch(TRENDING_MOVIES_API)
    .then(response => response.json())
    .then(data => {
      const mainPosterImage = document.querySelector('.main-poster .poster1');
      
      if (data.results && data.results.length > 0) {
        const firstMovie = data.results[0]; // Get the first trending movie
        mainPosterImage.src = IMG_URL + firstMovie.poster_path; // Set the TMDb image as the main poster
        mainPosterImage.alt = firstMovie.title; // Set alt text
      }
    })
    .catch(error => console.error('Error fetching TMDb image:', error));
}


function cycleMainPosters(movies) {
  let currentIndex = 0;
  const mainPosterImage = document.querySelector('.main-poster .poster1');

  setInterval(() => {
    const movie = movies[currentIndex];
    mainPosterImage.src = IMG_URL + movie.poster_path;
    mainPosterImage.alt = movie.title;

    // Move to the next movie, loop back if at the end
    currentIndex = (currentIndex + 1) % movies.length;
  }, 10000); // Change image every 10 seconds
}

function getMainPosterWithCycle() {
  fetch(TRENDING_MOVIES_API)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        cycleMainPosters(data.results); // Cycle through TMDb posters
      }
    })
    .catch(error => console.error('Error fetching TMDb images:', error));
}



 
 
 function getMovies(url){
 	fetch(url).then(res => res.json()).then(data =>{
 		console.log(data.results)
 		 showMovies(data.results);
 	})
 }
 
 function showMovies(data){
 	
 	const container =	document.getElementById('movie','shows');
 	
 	
 	container.innerHTML = '';
 	//show movies here
 	data.forEach(movie =>{
 	const {title, poster_path}= movie;
 	
 	const movieElement = document.createElement('div');
 	movieElement.classList.add('item')
 	movieElement.innerHTML=`
 <img class="item" src="${IMG_URL}${movie.poster_path}" alt="${movie.title}">
<!-- <div class="movie-info">
  <p class="movie-title">${movie.title}</p> -->
  </div>
 `;
 container.appendChild(movieElement);
 	});
 }
 
 
function getTVShows(url){
 	fetch(url).then(res => res.json()).then(data =>{
 		console.log(data.results)
 		 showTVShows(data.results);
 	})
 }
 
 function showTVShows(data){
 	
 	const container =	document.getElementById('shows');
 	
 	
 	container.innerHTML = '';
 	
 	data.forEach(show =>{
 	const {name, poster_path}= show;
 	
 	const showElement = document.createElement('div');
 	showElement.classList.add('item')
 	showElement.innerHTML=`
 <img class="item" src="${IMG_URL}${show.poster_path}" alt="${show.name}">
<!-- <div class="movie-info">
  <p class="movie-title">${show.name}</p>
  </div> -->
 `;
 container.appendChild(showElement);
 	});
 } 


function getAnime(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showAnime(data.results);
    });
}

function showAnime(data) {
    const container = document.getElementById('anime');
    container.innerHTML = '';

    data.forEach(anime => {
        const { name, poster_path } = anime;
        const animeElement = document.createElement('div');
        animeElement.classList.add('item');
        animeElement.innerHTML = `
            <img class="item" src="${IMG_URL}${poster_path}" alt="${name}">
            <!--<div class="movie-info">
                <p class="movie-title">${name}</p> 
            </div> -->
        `;
        container.appendChild(animeElement);
    });
}
 
 
 // Fetch and display highest-rated movies


function getHighestRatedMovies(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showHighestRatedMovies(data.results);
    });
}

function showHighestRatedMovies(data) {
    const container = document.getElementById('highest-rated-movies');
    container.innerHTML = '';

    data.forEach(movie => {
        const { title, poster_path } = movie;
        const movieElement = document.createElement('div');
        movieElement.classList.add('item');
        movieElement.innerHTML = `
            <img class="item" src="${IMG_URL}${poster_path}" alt="${title}">
           <!-- <div class="movie-info">
                <p class="movie-title">${title}</p>
            </div> -->
        `;
        container.appendChild(movieElement);
    });
}

// Fetch and display highest-rated TV shows


function getHighestRatedShows(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data.results);
        showHighestRatedShows(data.results);
    });
}

function showHighestRatedShows(data) {
    const container = document.getElementById('highest-rated-shows');
    container.innerHTML = '';

    data.forEach(show => {
        const { name, poster_path } = show;
        const showElement = document.createElement('div');
        showElement.classList.add('item');
        showElement.innerHTML = `
            <img class="item" src="${IMG_URL}${poster_path}" alt="${name}">
         <!--   <div class="movie-info">
                <p class="movie-title">${name}</p>
            </div> -->
        `;
        container.appendChild(showElement);
    });
}
 
 
 
 
 
 
 
 
 
 
 