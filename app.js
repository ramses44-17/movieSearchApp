export const apiKey = "api_key=7f77f1bc80c6fe267d4de7f850631d9d"
export const baseUrl = "https://api.themoviedb.org/3/"
const  apiUrl = baseUrl + "discover/movie?sort_by=popularity.desc&" + apiKey + '&include_adult=true'
export const imageUrl = "https://image.tmdb.org/t/p/w500"
const section = document.querySelector('.movieSection')
const search = document.querySelector('#search')
export const form = document.querySelector('#form')
const searchUrl = baseUrl + 'search/movie?' + apiKey
export const submit = document.querySelector('#submit')
const overlay = document.querySelector('.overlay')
const other = document.querySelector('#other')
const before = window.getComputedStyle(other,'::before')
const imgDetail = document.querySelector('#other img')
import { convertMinutesToHours,getGenresString,covertDate} from "./other.js"



export const prev = document.querySelector('#prev')
export const next = document.querySelector('#next')
export const current = document.querySelector('#current')

export var currentPage = 1
export var prevPage = 2
export var nextPage  = 3
export var totalPage = 200
export var lastUrl = ''

getMovie(apiUrl)

/***
 * @param {string} url
*/
export function getMovie(url) {
    lastUrl = url
    fetch(url)
    .then(res => res.json())
    .then(data => {
        
        console.log(data);
        if(data.results.length !== 0){
            showMovie(data.results)
            currentPage = data.page
            prevPage = currentPage - 1
            nextPage  = currentPage + 1
            totalPage = data.total_pages
            if (totalPage === 1) {
                prev.classList.add('disable')
                next.classList.add('disable')
            }else if (currentPage <= 1) {
                prev.classList.add('disable')
                next.classList.remove('disable')
            } else if(currentPage >= totalPage){
                prev.classList.remove('disable')
                next.classList.add('disable')
            }else{
                prev.classList.remove('disable')
                next.classList.remove('disable')
            }
            current.textContent = currentPage + ' /' + ` ${totalPage}`
            function scrollToTop() {
                window.scrollTo(
                    {
                        top: 0,
                        behavior: "smooth"
                    }
                )
            }
            
            window.addEventListener('load',scrollToTop())
        }else{
            section.innerHTML = `
            <ion-icon name="warning-outline" class='iconFound'></ion-icon>
            <h1 class="noFound" >no results found </h1>
            `
        }
    }).catch(e=>{
        const errorPage = `
        <div class="error">
        <h1>impossible de charger la page !!</h1>
        <ion-icon name="warning-outline"></ion-icon>
    </div>
        `
    document.body.innerHTML = errorPage;
})
}

export function showMovie(data) {
    section.innerHTML = ""
    data.forEach(movie => {
        const film = document.createElement('div')
        film.classList.add('movieBloc')
        film.innerHTML = `
        <a href="#"><img id='${movie.id}' src="${movie.poster_path?imageUrl + movie.poster_path: "https://via.placeholder.com/150/65ad4f"}" alt="image"></a>
        <div class="movieInfo">
            <h1 id="movieName">${movie.title || movie.name}</h1><span class="${getColors(movie.vote_average)}">${movie.vote_average}</span>
        </div>
        <div class="overview">
            <h3>overview</h3>
            ${movie.overview}
        </div>
        `
        section.appendChild(film)
        
        const img = document.getElementById(movie.id);
        const overlayIcon  = document.querySelector('#closeOverlay')
        img.addEventListener('click',()=>{
            overlay.style.width = '100vw'
            overlay.style.opacity = 1
            getMovieDetail(movie.id)
            getActors(movie.id)
            getVideo(movie.id)
            other.style.setProperty('--before',`url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`)
            imgDetail.setAttribute('src',movie.poster_path?imageUrl + movie.poster_path: "https://via.placeholder.com/150/65ad4f")
        })
        overlayIcon.addEventListener('click',()=>{
            overlay.style.width = 0
            overlay.style.opacity = 0
        })
    });

}
const moviePLus = document.querySelector('#moviePlus')
function getMovieDetail(id) {
    fetch(baseUrl + `movie/${id}?` + apiKey)
    .then(res => res.json())
    .then(detail => {
        console.log(detail);
        const {title,budget,genres,original_language,overview,runtime,release_date,tagline,status,revenue} = detail 
        moviePLus.innerHTML = ""
        const info = `
        <div id="first">
                        <h1>${title}</h1>
                        <ul>
                            <li>${covertDate(release_date)}</li>
                            <li>${getGenresString(genres)}</li>
                            <li>${convertMinutesToHours(runtime)}</li>
                        </ul>
                    </div>
                    <div id="second">
                        <p><em>${tagline}</em></p>
                        <div>
                            <h3>overview</h3>
                            <p>
                            ${overview}
                            </p>
                        </div>
                    </div>
                    <div id="third">
                        <div class="thirdDet">
                            <h4>status</h4>
                            <div>${status}</div>
                        </div>
                        <div class="thirdDet">
                            <h4>original language</h4>
                            <div>${original_language}</div>
                        </div>
                        <div class="thirdDet">
                            <h4>budget</h4>
                            <div>${budget}$</div>
                        </div>
                        <div class="thirdDet">
                            <h4>revenue</h4>
                            <div>${revenue}$</div>
                        </div>
                    </div>
        `
        moviePLus.innerHTML = info
    })
}


function getActors(id) {
    fetch(`${baseUrl}movie/${id}/credits?${apiKey}`)
  .then(response => response.json())
  .then(data => {
    console.log(data.cast);
    showMovieActor(data.cast);
    });
}

const movieActor = document.querySelector('#movieActor')
function showMovieActor(cast) {
    movieActor.innerHTML = ""
    cast.forEach(person => {
        const actorBloc = document.createElement('div')
        actorBloc.classList.add('actorBloc')
        actorBloc.innerHTML = `
        <img src=${person.profile_path? imageUrl + person.profile_path:"https://via.placeholder.com/150/65ad4f"} alt="actorImage">
        <div><h2>${person.original_name}</h2><span><i>${person.character?person.character:"????"}</i></span></div>
        `
        movieActor.appendChild(actorBloc)
    })
}
/**
 * @param {number} vote
 * @returns {string}
 */
export function getColors(vote) {
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
    }
})

submit.addEventListener('click',()=>{
    const searchTerm = search.value
    if (searchTerm) {
        getMovie(searchUrl + '&query=' + searchTerm)
    }
})

const genreUrl = baseUrl + 'genre/movie/list?' + apiKey
export const filter = document.querySelector('#filter')

getGenre(genreUrl)

function getGenre(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
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
 prev.addEventListener('click',()=>{
    if (prevPage > 0) {
        callPage(prevPage)
    }
 })
next.addEventListener('click',()=>{
    if (nextPage <= totalPage) {
        callPage(nextPage)
    }
})

// cette fonction gère la pagination

function callPage(page) {
    let separator = lastUrl.includes('?') ? '&' : '?'
    const pagination = `page=${page}`
    return `${getMovie(`${lastUrl}${separator}${pagination}`)}`
}
const searchIcons = document.querySelector('.icon')
const appNAme = document.querySelector('.appName')
const closer = document.querySelector('#close')

searchIcons.addEventListener('click',()=>{
    form.style.display = 'block'
    searchIcons.style.display = 'none'
    appNAme.style.display = 'none'
    form.style.width = '100%'
    search.style.width = '100%'
    closer.style.display = 'block'
    submit.style.display = 'none'
})
closer.addEventListener('click',()=>{
    form.style.display = 'none'
    searchIcons.style.display = 'block'
    appNAme.style.display = 'block'
    closer.style.display = 'none'
})


const topRated = document.querySelector('#topRated')
topRated.addEventListener('click',()=>{
    getMovie('https://api.themoviedb.org/3/movie/top_rated?' + apiKey)
}) 
const trending = document.querySelector('#trending')
trending.addEventListener('click',()=>{
    getMovie('https://api.themoviedb.org/3/trending/movie/day?' + apiKey)
})
const upcoming = document.querySelector('#upcoming')
upcoming.addEventListener('click',()=>{
    getMovie('https://api.themoviedb.org/3/movie/upcoming?' + apiKey)
})


//scroll des acteurs
const container = document.querySelector('#movieActor');
const scrollLeftButton = document.querySelector('#left');
const scrollRightButton = document.querySelector('#rigth');

scrollLeftButton.addEventListener('click', () => {
  container.scrollBy({
    left: -100,
    behavior: 'smooth'
  }) // Défilement horizontal vers la gauche de 100 pixels
});

scrollRightButton.addEventListener('click', () => {
  container.scrollBy({
    left: 100,
    behavior: 'smooth'
  }) // Défilement horizontal vers la droite de 100 pixels
});

function getVideo(id) {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?${apiKey}`)
    .then(res => res.json())
    .then(vData => {
        console.log(vData.results.filter(video => video.type === 'Trailer' || video.type === 'Teaser'));
        showVideo(vData.results.filter(video => video.type === 'Trailer' || video.type === 'Teaser'));
    })
    .catch(e => console.log('Une erreur s\'est produite :', error))
}
const vBloc = document.querySelector('#vBloc')
function showVideo(dataVideo) {
    vBloc.innerHTML = ''
    dataVideo.forEach(video =>{
        const iframe = document.createElement('iframe')
        iframe.width = '650'
        iframe.height = '450'
        iframe.src = `https://www.youtube.com/embed/${video.key}`
        iframe.title = video.name
        vBloc.appendChild(iframe)
    })
}
/*
const movieId = 928833

// recuperer les bandes annonces
const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?${apiKey}`;
fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data.results.filter(video => video.type === 'Trailer' || video.type === 'Teaser'));
  })
  .catch(error => {
    console.log('Une erreur s\'est produite :', error);
  });
*/