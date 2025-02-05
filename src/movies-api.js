import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const options = {
  api_key: "6b625c5706109501f8904a86f72dbacd",
  params: { language: "en-US" },
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YjYyNWM1NzA2MTA5NTAxZjg5MDRhODZmNzJkYmFjZCIsIm5iZiI6MTczODE3OTQxMS4yMzksInN1YiI6IjY3OWE4MzUzNGViYzk5MWVhNGJkNjg2ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-z4vzycY8kLZ7E0LjleQWjjGH6Mr2Y-WqyI3KgqMOxo",
  },
};

export const getMovies = async () => {
  const response = await axios.get("/trending/movie/day", options);
  return response.data.results;
};
export const getMoviesById = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}`, options);
  return response.data;
};
export const getActors = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/credits`, options);
  return response.data.cast;
};
export const getReviews = async (movieId) => {
  const response = await axios.get(`/movie/${movieId}/reviews`, options);
  return response.data.results;
};

export const getSearchByKeyword = async (keyword) => {
  const response = await axios.get(
    `search/movie?api_key=6b625c5706109501f8904a86f72dbacd&language=en-US&page=1&include_adult=false&query=${keyword}`
  );
  return response.data.results;
};
