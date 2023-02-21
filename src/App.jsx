import { useState, useRef } from 'react'
import { InfoMovie } from './components/InfoMovie'
import { LoadingIcon } from './components/Loading'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(true)
  const valueSearch = useRef(search)

  const searchMovies = async ({ search }) => {
    const res = await fetch(
      `https://www.omdbapi.com/?s=${search}&apikey=32f4401d`
    )
    const json = await res.json()
    const data = json.Search
    console.log(data)
    return data
  }

  const handleChange = (e) => {
    const value = e.target.value
    if (!value) return
    setSearch(value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (search === valueSearch.current) return
    valueSearch.current = search

    try {
      setLoading(true)
      const newData = await searchMovies({ search })
      setMovies(newData)
    } catch (error) {
      setErr(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container'>
      <h1>Buscador de peliculas</h1>
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type='text'
          placeholder='El gato con botas, Avatar, SpiderMan...'
        />
        <button type='submit'>Buscar</button>
      </form>
      <div className='container-movies'>
        {loading ? <LoadingIcon /> : <InfoMovie movies={movies} />}
      </div>
    </div>
  )
}

export default App
