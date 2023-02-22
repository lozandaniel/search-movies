export const searchMovies = async ({ search }) => {
  const res = await fetch(
    `https://www.omdbapi.com/?s=${search}&apikey=32f4401d`
  )
  const json = await res.json()
  const data = json.Search
  return data
}
