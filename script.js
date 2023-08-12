const sniper = document.getElementById("sniperBody");
function showMovieOntoUI(Data){
        const movieContainer = document.getElementById("movieContainer");
        if(Data.Response===false){
            sniper.style.display = "none";
            throw new Error(Data.Error);
        }
        sniper.style.display = "none";
        const movies = Data.Search;
        const NotAvailPoster = "https://i0.wp.com/bestoftheyear.in/wp-content/uploads/2017/07/poster-unavailable-not-released.jpg?fit=400%2C560&ssl=1"
        movies.forEach((movie)=>{
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
            <img src=${movie.Poster==='N/A' ?NotAvailPoster:movie.Poster} alt="poster" class="poster" width="300px" height="400px">
            <div class="title">${movie.Title}</div>
            <p>${movie.Year}</p>
            <a href="https://www.imdb.com/title/${movie.imdbID}">More Details</a>
            `
       movieContainer.appendChild(card);
        })

}

const searchbtn = document.getElementById("searchBtn")
searchbtn.addEventListener("click",()=>{
    sniper.style.display = "";
    const API_KEY = document.getElementById("apikey").value.trim();
    const SEARCH_TERM = document.getElementById("title").value.trim();
    if(API_KEY===""&& SEARCH_TERM===""){
        const movieContainer = document.getElementById("movieContainer");
        movieContainer.innerHTML = "";
        alert("Please enter valid api key or title")
    }else{
        const sniper = document.getElementById("sniperBody");
        sniper.style.display = "";
        const baseUrl = `https://www.omdbapi.com/?s=${SEARCH_TERM}&apikey=${API_KEY}`;
        async function FetchMovieDetails(){
            try{
                const url = baseUrl;
                const response = await fetch(url, {method:"GET"});
                if(!response.ok){
                    throw new Error("Response not Good");
                }
                const result = await response.json();
                console.log(result);
                showMovieOntoUI(result);
            }catch(error){
                sniper.style.display = "none";
                alert("Invalid API Key!", error);
                const movieContainer = document.getElementById("movieContainer");
                movieContainer.innerHTML = "";
            }
          
        }
        FetchMovieDetails();
    }
})


//<a href="https://www.imdb.com/title/imdbID">More Details  "3df8a332";</a>

