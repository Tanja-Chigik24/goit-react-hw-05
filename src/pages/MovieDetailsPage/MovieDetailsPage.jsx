import { Suspense, useEffect, useRef, useState } from "react";
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from "react-router-dom";
import { getMoviesById } from "../../movies-api";
import MovieInfo from "../../components/MovieInfo/MovieInfo";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MovieDetailsPage.module.css";

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const location = useLocation();
  const backLinkURLRef = useRef(location.state ?? "/movies");

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);
        const data = await getMoviesById(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchMovie();
  }, [movieId]);

  if (!movie) {
    return;
  }
  return (
    <div>
      <p>
        <b className={css.text}>MovieDetailsPage -{movieId}</b>
      </p>
      <Link to={backLinkURLRef.current} className={css.goBack}>
        Go back
      </Link>
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {movie && <MovieInfo movie={movie} />}
      <ul className={css.linkList}>
        <li>
          <NavLink to="cast" className={css.linkInfo}>
            MovieCast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={css.linkInfo}>
            MovieReviews
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<p className={css.text}>Loading nested route...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
}
