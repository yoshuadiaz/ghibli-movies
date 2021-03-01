import Link from "next/link"
import movieListStyles from "../styles/MovieList.module.css"
const MovieListItem = ({ id, title, description }) => {
  return (
    <article className={movieListStyles.item}>
      <Link href={`/${id}`}>
        <h3 className={movieListStyles.title} key={id}>
          {title}
        </h3>
      </Link>
      <p className={movieListStyles.description}>{description}</p>
      <Link href={`/${id}`}>
        <span className={movieListStyles.readMore}>Read more</span>
      </Link>
    </article>
  )
}

export default MovieListItem
