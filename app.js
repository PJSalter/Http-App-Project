/* --------------------- js fetch api will go here -------------------------*/

const voiceAudio = document.getElementById("sheldonVoice");
const commenceVoiceActivate = document.querySelector(".clickBtn");

commenceVoiceActivate.addEventListener("click", function () {
   
    if(!voiceAudio.paused) { /* Check if it's not paused */
    voiceAudio.pause();  /* To pause the audio */
    voiceAudio.currentTime = 0;  /* To reset the time back to 0 */
    }
    else {
        voiceAudio.play();  /* To make it play again */
    }

    // display nothing in styling once voice plays.
    voiceAudio.style.display = none;
})

//---------------------------------------------------------------//
// ------------------ the movie database work  ---------------- //
// -------------------------------------------------------------//

// adding the api_key= at the beginning of key because it'll be easier to pick up.
let tvApiKey = 'api_key=16579ec555cffd0b9f2bce03c11c35ef';

let primary_URL = 'https://api.themoviedb.org/3'

// this picks up the most popular movies 
// adding the api key at the end of it.
let pickUp_URL = `${primary_URL}/discover/movies?sort_by=popularity.desc${tvApiKey}`;
let searchURL = `${primary_URL}/search/movie?${tvApiKey}`;


// to pick up the beginning url so that it shows the image of movie poster.
let posterMovie = 'https://image.tmdb.org/t/p/w500';

// picking up the main tag.
let mainArea = document.querySelector('main')
let form = document.querySelector('form')
let search = document.querySelector("#message-box")

// url I may work with later that picks up sci fi movies
// /discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc



// creating function get color and passing in vote.
let getColor = vote => {
    vote >= 8 ? 'green' : vote >= 5 ? 'orange' : 'red';
}

// a function to pick up all the movies.
let pickSciFiMovie = url => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data.results);
        //create a function to show movies that will pass on this data/
        presentMovies(data.results);
    })
    .catch(error => console.error(error));
}

//call the function so that it picks up the data in the console.
pickSciFiMovie(pickUp_URL);

// creating the function to show the movies

let presentMovies = data => {
    // shows in console that there is an array of 20 that we can loop thru.
    
    data.forEach(movie => {
        // setting inner html.
        mainArea.innerHTML = ''
    
        // create object destructuring here.
        const {title, poster_path, vote_average} = movie;
        //so for each movie we want to do something.
        // create a div.
        const elFilm = document.createElement('div')
        // add a classlist of film to this
        elFilm.classList.add('film')
        // then add the data to this.
        elFilm.innerHTML = `
        <img src="${posterMovie+poster_path}" alt="${title}">
      
      <div class="movie-info">
        <h3>
        ${title}
        </h3>
        <span class="${getColor(vote_average)}">${vote_average}</span>
      </div>
        
        `
    
     //      Add overview div for movie descriptions 
     //     <div class="overview">
     //    <h4>${overview}</h4>
     //    </div>
    
        // append all the child elements into the main tag.
        mainArea.appendChild(elFilm);
    })
    }

// Event listener to grab form tag and link to movie search
form.addEventListener('submit', (e) => {
    // prevents form from refreshing when user clicks submit button
    e.preventDefault();


    const searchTerm = search.value;

    if(searchTerm) {
        pickSciFiMovie(searchURL+'&query='+searchTerm)
    } else {
        pickSciFiMovie(pickUp_URL);
    }
})

