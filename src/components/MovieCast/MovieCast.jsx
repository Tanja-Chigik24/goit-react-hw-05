import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getActors } from "../../movies-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieCast.module.css";

export default function MovieCast() {
  const { movieId } = useParams();
  const [actors, setActors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchActorsOfMovie() {
      try {
        setLoading(true);
        const actors = await getActors(movieId);
        setActors(actors);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchActorsOfMovie();
  }, [movieId]);

  return (
    <div>
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {actors.length !== 0 && (
        <ul className={css.actorsList}>
          {actors.map(
            ({ id, profile_path, original_name, name, character }) => (
              <li key={id}>
                <img
                  width="200px"
                  src={
                    profile_path
                      ? `https://image.tmdb.org/t/p/w500${profile_path}`
                      : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
                  }
                  alt={original_name}
                />
                <p className={css.text}>{name}</p>
                <p className={css.text}>Character: {character}</p>
              </li>
            )
          )}
        </ul>
      )}
      {actors.length === 0 && (
        <div className={css.message}>
          We don't have any actors for this movie
        </div>
      )}
    </div>
  );
}
