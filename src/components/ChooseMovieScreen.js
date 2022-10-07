import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import loading from "../assets/loading.gif";
import errorImg from "../assets/errorImg.gif";
import { Link } from "react-router-dom";

export default function ChooseMovieScreen() {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(false);
  const url = "https://mock-api.driven.com.br/api/v5/cineflex/movies";

  useEffect(() => {
    const promise = axios.get(url);

    promise.then((response) => setMovies(response.data));

    promise.catch(() => {
      alert("Não foi possível carregar a lista de filmes");
      setError(true);
    });
  }, []);

  if (error === true) {
    return (
      <Body>
        <p>Recarregue a página e tente novamente</p>
        <img src={errorImg} alt="gif comendo pipoca" />
      </Body>
    );
  }

  if (movies === null) {
    return (
      <Body>
        <img src={loading} alt="gif carregando" />
      </Body>
    );
  }

  return (
    <Body>
      <p>Selecione o filme</p>
      <MovieList>
        {movies.map((movie) => (
          <Link to={`/sessions/${movie.id}`}>
            <MoviePoster key={movie.id}>
              <img src={movie.posterURL} alt={movie.title} />
            </MoviePoster>
          </Link>
        ))}
      </MovieList>
    </Body>
  );
}

const Body = styled.main`
  width: 100%;
  padding-top: 67px;

  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-family: "Roboto", sans-serif;
    font-size: 24px;
    color: #293845;
    margin: 50px 0px;
    text-align: center;
  }
`;

const MovieList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

const MoviePoster = styled.li`
  width: 145px;
  height: 209px;
  margin-bottom: 10px;

  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;

  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 129px;
    height: 193px;
  }
`;
