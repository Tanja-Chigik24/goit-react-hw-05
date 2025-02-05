import { Link } from "react-router-dom";
import css from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <div>
      <p>Oops!Page not found! Sorry!</p>
      <p className={css.text}>
        Please visit out <Link to="/">home page</Link>
      </p>
    </div>
  );
}
