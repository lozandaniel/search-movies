export const InfoMovie = ({ movies }) => {
  const lenghtMovies = movies?.length > 0
  return (
    <>
      {lenghtMovies ? (
        movies.map((movie) => (
          <div key={movie.imdbID} className='movie'>
            <h2>{movie.Title}</h2>
            <img src={movie.Poster} alt={movie.Title} />
            <em>{movie.Year}</em>
          </div>
        ))
      ) : (
        <p>No se encuentran peliculas.</p>
      )}
    </>
  )
}
