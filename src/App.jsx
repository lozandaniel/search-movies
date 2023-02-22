import { useState, useRef } from 'react'
import { InfoMovie } from './components/InfoMovie'
import { LoadingIcon } from './components/Loading'
import { searchMovies } from './services/SearchMovies'
import './App.css'

function App() {
  const [movies, setMovies] = useState([])
  const [search, setSearch] = useState('')
  const [err, setErr] = useState(false)
  const [loading, setLoading] = useState(false)
  const valueSearch = useRef(search)

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
