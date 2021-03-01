import { useReducer, useCallback, useRef, useEffect } from "react"
import { useRouter } from "next/router"
import layoutStyles from "../styles/Layout.module.css"
import detailStyles from "../styles/DetailStyles.module.css"
import { Rating } from "semantic-ui-react"

import Navbar, {
  initialState,
  searchReducer,
  navbarHandleOnSearch,
  navbarHandleOnSelect,
} from "../components/Navbar"

const MAX = 5
const FACTOR = 100 / MAX / MAX

const MovieDetail = (props) => {
  const {
    title,
    description,
    director,
    producer,
    release_date,
    rt_score,
  } = props
  const timeoutRef = useRef()
  const router = useRouter()
  const [search, dispatch] = useReducer(searchReducer, initialState)

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
      <Navbar
        handleOnSelect={handleOnSelect}
        handleOnSearch={handleOnSearch}
        results={search.results}
      />
      <div>
        <article
          className={`${layoutStyles.container} ${detailStyles.container}`}
        >
          <header className={detailStyles.header}>
            <h2 className={detailStyles.title}>{title}</h2>
          </header>
          <hr />
          <div className={detailStyles.content}>
            <ul className={detailStyles.metadata}>
              <li className={detailStyles.metadataItem}>
                <h4 className={detailStyles.term}>Director: </h4>
                <p className={detailStyles.definition}>{director}</p>
              </li>
              <li className={detailStyles.metadataItem}>
                <h4 className={detailStyles.term}>Producer: </h4>
                <p className={detailStyles.definition}>{producer}</p>
              </li>
              <li className={detailStyles.metadataItem}>
                <h4 className={detailStyles.term}>Rating: </h4>
                <p className={detailStyles.definition}>
                  <Rating
                    icon="star"
                    defaultRating={Math.ceil(rt_score / MAX / FACTOR)}
                    maxRating={MAX}
                  />
                </p>
              </li>
              <li className={detailStyles.metadataItem}>
                <h4 className={detailStyles.term}>Release date: </h4>
                <p className={detailStyles.definition}>{release_date}</p>
              </li>
            </ul>
            <p className={detailStyles.description}>{description}</p>
          </div>
        </article>
      </div>
    </div>
  )
}

export async function getStaticPaths() {
  const res = await fetch("https://ghibliapi.herokuapp.com/films")
  const data = await res.json()

  return {
    paths: data.map((m) => ({
      params: { id: m.id },
    })),
    fallback: true,
  }
}

export async function getStaticProps({ params }) {
  const res = await fetch(`https://ghibliapi.herokuapp.com/films/${params.id}`)
  const data = await res.json()

  const resSearch = await fetch("https://ghibliapi.herokuapp.com/films")
  const dataSearch = await resSearch.json()

  if (!data.title || !data) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }
  return { props: { ...data, movies: dataSearch } }
}

export default MovieDetail
