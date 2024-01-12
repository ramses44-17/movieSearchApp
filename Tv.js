import { getMovie, apiKey,imageUrl,baseUrl,getColors,showMovie,prev,next,current,currentPage,prevPage,nextPage,totalPage,lastUrl,form,submit,filter} from "./app.js";
const urlTV = baseUrl + "discover/tv?sort_by=popularity.desc&" + apiKey + '&include_adult=true'
const searchUrl = baseUrl + 'search/tv?' + apiKey

getMovie(urlTV)

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

const genreUrl = baseUrl + 'genre/tv/list?' + apiKey

getGenre(genreUrl)

function getGenre(url) {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        showGenre(data.genres)
    })
 }


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
      getMovie(baseUrl +'discover/tv?' + apiKey + `&with_genres=${selectedGenreString}` + '&include_adult=true' )
   }

   const topRated = document.querySelector('#topRatedTv')
topRated.addEventListener('click',()=>{
    getMovie('https://api.themoviedb.org/3/tv/top_rated?' + apiKey)
}) 
const trending = document.querySelector('#trendingTv')
trending.addEventListener('click',()=>{
    getMovie('https://api.themoviedb.org/3/trending/tv/day?' + apiKey)
})
const airingToday = document.querySelector('#airingToday')
airingToday.addEventListener('click',()=>{
    getMovie('https://api.themoviedb.org/3/tv/airing_today?' + apiKey)
})
const onTheAir = document.querySelector('#onTheAir')
onTheAir.addEventListener('click',()=>{
    getMovie('https://api.themoviedb.org/3/tv/on_the_air?' + apiKey)
})



