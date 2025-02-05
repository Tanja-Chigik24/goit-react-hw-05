import { useEffect, useMemo, useState } from "react";
import { getSearchByKeyword } from "../../movies-api";
import MovieList from "../../components/MovieList/MovieList";
import Loader from "../../components/Loader/Loader";
import MoviesFilter from "../../components/MoviesFilter/MoviesFilter";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import css from "./MoviesPage.module.css";
import { useSearchParams } from "react-router-dom";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get("query") ?? "";

  const changeMoviesFilter = (newFilter) => {
    searchParams.set("query", newFilter);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    async function fetchSearchByKeyword() {
      try {
        setLoading(true);
        const data = await getSearchByKeyword(queryParam);
        setMovies(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchSearchByKeyword();
    console.log(queryParam);
  }, [queryParam]);

  const filteredMovies = useMemo(() => {
    return movies.filter((movie) =>
      movie.title.toLowerCase().includes(queryParam.toLowerCase())
    );
  }, [queryParam, movies]);

  return (
    <div>
      <MoviesFilter onFilter={changeMoviesFilter} />
      {error && <ErrorMessage />}
      {loading && <Loader />}

      {filteredMovies.length > 0 ? (
        <MovieList movies={filteredMovies} />
      ) : (
        <p className={css.text}>
          There is no movies with this request. Please, try again
        </p>
      )}
    </div>
  );
}
