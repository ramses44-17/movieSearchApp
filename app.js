const apiKey = "api_key=7f77f1bc80c6fe267d4de7f850631d9d"
const baseUrl = "https://api.themoviedb.org/3/"
const  apiUrl = baseUrl + "discover/movie?sort_by=popularity.desc&" + apiKey + '&include_adult=true'
const imageUrl = "https://image.tmdb.org/t/p/w500"
const section = document.querySelector('.movieSection')
const search = document.querySelector('#search')
const form = document.querySelector('#form')
const searchUrl = baseUrl + 'search/movie?' + apiKey
const submit = document.querySelector('#submit')

getMovie(apiUrl)

function getMovie(url) {
    fetch(url).then(res => res.json()).then(data => {
        
        console.log(data);
        if(data.results.length !== 0){
            showMovie(data.results)
        }else{
            section.innerHTML = `
            <ion-icon name="warning-outline" class='iconFound'></ion-icon>
            <h1 class="noFound" >no results found </h1>
            `
        }
    })
}



function showMovie(data) {
    section.innerHTML = ""
    data.forEach(movie => {
        const film = document.createElement('div')
        film.classList.add('movieBloc')
        film.innerHTML = `
        <a href="#"><img src="${movie.poster_path?imageUrl + movie.poster_path: "https://via.placeholder.com/150/65ad4f"}" alt="image"></a>
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
        getMovie(searchUrl + '&query=' + searchTerm + '&include_adult=true')
    }else{
        getMovie(apiUrl)
    }
})

submit.addEventListener('click',()=>{
    const searchTerm = search.value
    if (searchTerm) {
        getMovie(searchUrl + '&query=' + searchTerm)
    }else{
        getMovie(apiUrl)
    }
})
 const movieAppName = document.querySelector('.appName').addEventListener('click',()=>{
    getMovie(apiUrl)
 })

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

// cette fontion affiche le genre sous forme de bouton
 function showGenre(data) {
  filter.innerHTML = ''
  data.forEach(genres => {
    const genre = document.createElement('button')
    genre.classList.add('filterB')
    genre.textContent = genres.name

    filter.appendChild(genre)
    genre.addEventListener('click',()=>{
        toggleGenreSelection(genres.id)
        genre.classList.toggle('active')
       getFilteredMovie()
    })
  })  
 }

 const genreSelected = []

 function toggleGenreSelection(genreId) {
    const index = genreSelected.indexOf(genreId)
    if (index > -1) {
        genreSelected.splice(index,1)
    }else{
        genreSelected.push(genreId)
    }
   getFilteredMovie()
 }

 function getFilteredMovie() {
    const selectedGenreString = genreSelected.join(',')
    getMovie(baseUrl +'discover/movie?' + apiKey + `&with_genres=${selectedGenreString}` + '&include_adult=true' )
 }



