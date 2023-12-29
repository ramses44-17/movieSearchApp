const apiKey = "api_key=7f77f1bc80c6fe267d4de7f850631d9d"
const baseUrl = "https://api.themoviedb.org/3/"
const  apiUrl = baseUrl + "discover/movie?sort_by=popularity.desc&" + apiKey
const imageUrl = "https://image.tmdb.org/t/p/w500"
const section = document.querySelector('.movieSection')
const search = document.querySelector('#search')
const form = document.querySelector('#form')
const searchUrl = baseUrl + 'search/movie?' + apiKey
const submit = document.querySelector('#submit')

fetchUrl(apiUrl)

function fetchUrl(url) {
    fetch(url).then(res => res.json()).then(data => {
        getMovie(data.results)
        console.log(data);
    })
}



function getMovie(data) {
    section.innerHTML = ""
    data.forEach(movie => {
        const film = document.createElement('div')
        film.classList.add('movieBloc')
        film.innerHTML = `
        <a href="#"><img src="${imageUrl + movie.poster_path}" alt="image"></a>
        <div class="movieInfo">
            <h1 id="movieName">${movie.title}</h1><span class="${getColors(movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="overview">
            <h3>overview</h3>
            ${movie.overview}
        </div>
        `
        section.appendChild(film)

        
    });
}

function getColors(vote) {
    if (vote >= 8) {
        return 'green'
    } else if(vote >= 5){
        return 'orange'
    }else{
        return 'red'
    }
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()
    const searchTerm = search.value
    if (searchTerm) {
        fetchUrl(searchUrl + '&query=' + searchTerm)
    }else{
        fetchUrl(apiUrl)
    }
})

submit.addEventListener('click',()=>{
    const searchTerm = search.value
    if (searchTerm) {
        fetchUrl(searchUrl + '&query=' + searchTerm)
    }else{
        fetchUrl(apiUrl)
    }
})
 const movieAppName = document.querySelector('.appName').addEventListener('click',()=>{
    fetchUrl(apiUrl)
 })

 fetch(`https://api.themoviedb.org/3/discover/movie?${apiKey}&with_genres=28`).then(res => res.json()).then(data => console.log(data))

const genreUrl = baseUrl + 'genre/movie/list?' + apiKey
const filter = document.querySelector('#filter')

getGenre(genreUrl)

 function getGenre(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data.genres);
        showGenre(data.genres)
    })
 }

// cette fontion affiche le genre souds forme de bouton
 function showGenre(data) {
  filter.innerHTML = ''
  data.forEach(genres => {
    const genre = document.createElement('button')
    genre.classList.add('filterB')
    genre.innerHTML = genres.name

    filter.appendChild(genre)
  } )  
 }