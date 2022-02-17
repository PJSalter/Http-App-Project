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

//api key from GHIPY 

let API_KEY = "yTk65md4VUpLFHxJvS6bqFOcT31mDqFg";

/* Function to generate random number for different APIs */
const randomNumber = (number) => Math.floor(Math.random() * (number - 1));

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
let mainArea = document.getElementById('content-display')
let form = document.querySelector('form')
let search = document.querySelector("#message-box")
let button = document.querySelector(".button")

// url I may work with later that picks up sci fi movies
// /discover/movie?with_genres=878&with_cast=500&sort_by=vote_average.desc

// creating function get color and passing in vote.
let getColor = vote => {
    vote >= 8 ? 'green' : vote >= 5 ? 'orange' : 'red';
}

// creating the function to show the movies

let presentMovies = data => {
    // shows in console that there is an array of 20 that we can loop thru.
    //console.log(data);
    let randomFilm = randomNumber(data.length);
    //data.forEach((movie) => {
        let movie = data[randomFilm];
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
    //console.log(mainArea)
     //      Add overview div for movie descriptions 
     //     <div class="overview">
     //    <h4>${overview}</h4>
     //    </div>
    
        // append all the child elements into the main tag.
        mainArea.appendChild(elFilm);
    }

    // a function to pick up all the movies.
let pickSciFiMovie = async (url) => {
    let response = await fetch(url)
    return response
    /*
    .then((response) => {
        if (!response.ok) {
          const error = new Error(response.status)
          throw error
        }
        return response.json()
      })
    .then(data => {
        console.log(data.results); // .results
        //create a function to show movies that will pass on this data/
        presentMovies(data.results); // .results
    })
    .catch(error => console.error(error));
    */
}

const scifiProcess = data => {
    presentMovies(data.results);
}

//call the function so that it picks up the data in the console.
//pickSciFiMovie(pickUp_URL);

//eventListener added 
async function giphysearch() {
  
    let url = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=1&q=`;
    let str = document.getElementById("message-box").value.trim();
    url = url.concat(str);
    let response = await fetch(url);

    return response;
}

const giphyProcess = content => {
        let fig = document.createElement("figure");  // fig element created 
        let img = document.createElement("img"); // image element created
        // let fc = document.createElement("figcaption");
       
        console.log(content)
        img.src = content.data[randomNumber(content.data.length)].images.downsized.url;  // source for image provided 
        img.alt = content.data[randomNumber(content.data.length)].title; 
        
        //img.src = content.data[randomNumber(content.data.length)].images.downsized.url;  // source for image provided 
        //img.alt = content.data[randomNumber(content.data.length)].title;  // alt title provided in the event of failure to load image
        fig.appendChild(img);   // image element added to fig

        let output = document.querySelector(".output");  
        output.innerHTML = '';
        output.appendChild(fig);
        //document.querySelector("#message-box").value = "";
        button.value = "";
}


// Event listener to grab form tag and link to movie search
form.addEventListener('submit', (e) => {
    // prevents form from refreshing when user clicks submit button
    e.preventDefault();


    const searchTerm = search.value;

    if(searchTerm) {
        fetchAsyncData(searchURL+'&query='+searchTerm)
    } else {
        fetchAsyncData(pickUp_URL);
    }

    console.log('yo')

    //fetchAsyncData()

   //giphysearch(e);
})


/*
button.addEventListener('keydown', (e) => {
    // prevents form from refreshing when user clicks submit button
    e.preventDefault();
    const searchTerm = search.value;
    if(searchTerm) {
        pickSciFiMovie(searchURL+'&query='+searchTerm)
    } else {
        pickSciFiMovie(pickUp_URL);
    }
    console.log(giphysearch(e));
})
*/



   // movies 
   //let moviePromise = fetch(`https://api.themoviedb.org/3/discover/movies?sort_by=popularity.desc${tvApiKey}`);

   // giphy
   //let githyPromise = fetch(`http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=1&q=`);

  // Observing with timing functions
/*
  const PromiseTimeOne = new Promise((moviePromise) => {
      setTimeout(() =>{
          const newEstimate = Math.floor(Math.random() * 20);
          moviePromise(newEstimate)
      }, 5000);
  })
  const PromiseTimeTwo = new Promise((githyPromise) => {
    setTimeout(() =>{
        const newEstimate = Math.floor(Math.random() * 20);
        githyPromise(newEstimate)
    }, 8000);
})
*/

const fetchAsyncData = async (search) => {
const response = await Promise.all([giphysearch(),  pickSciFiMovie(search)])
console.log(response)
const responseData = await Promise.all(response.map(el => el.json()))
console.log(responseData)

giphyProcess(responseData[0])
scifiProcess(responseData[1])


//Promise.all([moviePromise, githyPromise])
/*
     .then((apisResponsesArray) => {
      // Return another promise as an array with the parsed content of the previous response.
      return Promise.all(
        apisResponsesArray.map((apiResponse) => apiResponse.json()),
      )
    })
    .then((parsedReponsesArray) => {
        console.log(parsedReponsesArray)
      // Destructure the parsed reponses array into separate variables.
      const [movieResponse, giphyResponse] = parsedReponsesArray
       
      // Call functions to display content of the separate responses of the APIs.
      //giphysearch(giphyResponse);
      //giphysearch(giphyResponse);
      //presentMovies(movieResponse)
      //pickSciFiMovie(movieResponse)
      //pickSciFiMovie(movieResponse);
    })
    .catch((error) => console.log(error))
    */
}
