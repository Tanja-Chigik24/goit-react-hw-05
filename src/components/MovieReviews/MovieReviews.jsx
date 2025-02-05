import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReviews } from "../../movies-api";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import css from "./MovieReviews.module.css";

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchReviewsFilms() {
      try {
        setLoading(true);
        const reviews = await getReviews(movieId);
        setReviews(reviews);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchReviewsFilms();
  }, [movieId]);

  return (
    <div>
      {error && <ErrorMessage />}
      {loading && <Loader />}
      {reviews.length !== 0 && (
        <ul className={css.reviewList}>
          {reviews.map((review) => (
            <li key={review.id}>
              <h2>Author: {review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews.length === 0 && (
        <div className={css.text}>We don't have any reviews for this movie</div>
      )}
    </div>
  );
}
