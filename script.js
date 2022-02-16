

API_KEY = "yTk65md4VUpLFHxJvS6bqFOcT31mDqFg"
//api key from GHIPY 
const formEl = document.querySelector('form');
document.addEventListener("DOMContentLoaded", giphysearch);

//eventListener added 
function giphysearch() {
  document.querySelector(".button").addEventListener("click", event => {
    event.preventDefault(); 
    //to stop the page reload

    let url = `http://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=1&q=`;
    let str = document.getElementById("message-box").value.trim();
    url = url.concat(str);
//field input will be added to the end of the url using concat method 
    
  //fetch request send using the url  
    fetch(url) 
      .then(response =>  {
        if(!response.ok) throw new error(response.status);
        return response.json();
      })
      .then(content => {     // data from response 
        
        
        let fig = document.createElement("figure");  // fig element created 
        let img = document.createElement("img");   // image element created
        // let fc = document.createElement("figcaption");
        img.src = content.data[0].images.downsized.url;  // source for image provided 
        img.alt = content.data[0].title;  // alt title provided in the event of failure to load image
        fig.appendChild(img);   // image element added to fig
      
        let output = document.querySelector(".output");  
        output.appendChild(fig);
        document.querySelector("#message-box").value = "";
      })
      .catch(error => {
        console.error(error);
      });
  });
}