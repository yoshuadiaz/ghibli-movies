import { useReducer, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import layoutStyles from "../styles/Layout.module.css"
import movieListStyles from "../styles/MovieList.module.css"
import MovieListItem from "../components/MovieListItem"
import Navbar, {
  initialState,
  searchReducer,
  navbarHandleOnSearch,
  navbarHandleOnSelect,
} from "../components/Navbar"

export default function Home(props) {
  const timeoutRef = useRef()
  const router = useRouter()
  const [search, dispatch] = useReducer(searchReducer, initialState)
  const displayedMovies = search.results != null ? search.results : props.movies

  const handleOnSelect = (_e, { result }) => {
    navbarHandleOnSelect(router, result.id)
  }

  const handleOnSearch = useCallback((_e, data) => {
    navbarHandleOnSearch(props.movies, data, timeoutRef.current, dispatch)
  }, [])

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  return (
    <div>
      <Head>
        <title>Studio Ghibli | Movies</title>
      </Head>
      <Navbar
        handleOnSelect={handleOnSelect}
        handleOnSearch={handleOnSearch}
        results={search.results}
      />
      <section className={`${layoutStyles.container} ${movieListStyles.list}`}>
        {displayedMovies.map((m) => (
          <MovieListItem key={m.id} {...m} />
        ))}
      </section>
    </div>
  )
}

export async function getStaticProps() {
  const res = await fetch("https://ghibliapi.herokuapp.com/films")
  const data = await res.json()

  return { props: { movies: [...data] } }
}
