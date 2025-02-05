import css from "./MoviesFilter.module.css";

export default function MoviesFilter({ onFilter }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    onFilter(form.elements.query.value);
    form.reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p className={css.nameFilter}> Filter by title </p>
        <input type="text" name="query" autoFocus className={css.searchForm} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
