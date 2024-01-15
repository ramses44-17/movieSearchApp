export function convertMinutesToHours(minutes) {
    var hours = Math.floor(minutes / 60);
    var remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`
  }
export function getGenresString(genres) {
    if (genres.length === 0) {
      return "";
    }
    const genreNames = genres.map(genre => genre.name);
    return genreNames.join(", ");
  }
export function covertDate(str) {
    const splited = str.split('-').reverse()
    return splited.join('/')
}