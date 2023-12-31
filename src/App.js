import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFav from "./components/AddFav";
import RemoveFav from "./components/RemoveFav";

function App() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const getMovieRequest = async (searchValue) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=675cf7f0`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    const movieFavorites = JSON.parse(
      localStorage.getItem("react-movie-app-favorites") || "[]"
    );

    setFavorites(movieFavorites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favorites", JSON.stringify(items));
  };

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter(
      (favorite) => favorite.imdbID !== movie.imdbID
    );
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        ></SearchBox>
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          handleFavoriteClick={addFavoriteMovie}
          favoriteComponent={AddFav}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favorites" />
      </div>
      <div className="row">
        <MovieList
          movies={favorites}
          handleFavoriteClick={removeFavoriteMovie}
          favoriteComponent={RemoveFav}
        />
      </div>
    </div>
  );
}

export default App;
