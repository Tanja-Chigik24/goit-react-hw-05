import css from "./MovieInfo.module.css";

export default function MovieInfo({
  movie: {
    poster_path,
    original_title,
    title,
    overview,
    popularity,
    release_date,
    genres,
  },
}) {
  return (
    <div className={css.container}>
      <img
        width="300px"
        src={
          poster_path
            ? `https://image.tmdb.org/t/p/w500${poster_path}`
            : `https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg`
        }
        alt={original_title}
      />
      <div className={css.info}>
        <h1>{title} </h1>
        <h2>Overview </h2>
        <p>{overview}</p>
        <p>Popularity: {popularity} </p>
        <p>Release_date: {release_date} </p>
        <h2>Genres:</h2>
        <ul className={css.list}>
          {genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
