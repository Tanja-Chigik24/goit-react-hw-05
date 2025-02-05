import { Link, useLocation } from "react-router-dom";
import css from "./MovieCard.module.css";

export default function MovieCard({ movie: { id, title } }) {
  const location = useLocation();
  return (
    <>
      <div className={css.card}>
        <Link to={`/movies/${id}`} state={location} className={css.detailsLink}>
          {title}
        </Link>
      </div>
    </>
  );
}
