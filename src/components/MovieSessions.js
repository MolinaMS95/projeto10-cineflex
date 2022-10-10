import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import loading from "../assets/loading.gif";
import errorImg from "../assets/errorImg.gif";
import axios from "axios";
import BottomBar from "./BottomBar";

export default function MovieSessions({ setDay, setHour, setInitialPage }) {
  const { idFilm } = useParams();
  const [sessions, setSessions] = useState(null);
  const [error, setError] = useState(false);
  const url = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${idFilm}/showtimes`;

  useEffect(() => {
    const promise = axios.get(url);

    promise.then((response) => setSessions(response.data));

    promise.catch(() => {
      alert("Não foi possível carregar as sessões para este filme");
      setError(true);
    });

    setInitialPage(false);
  }, [url, setInitialPage]);

  function setTime(day, hour) {
    setDay(day);
    setHour(hour);
  }

  if (error) {
    return (
      <Body>
        <p>Recarregue a página e tente novamente</p>
        <img src={errorImg} alt="gif comendo pipoca" />
      </Body>
    );
  }

  if (sessions === null) {
    return (
      <Body>
        <img src={loading} alt="gif carregando" />
      </Body>
    );
  }
  return (
    <Body>
      <p>Selecione o horário</p>
      <SessionList>
        {sessions.days.map((day) => (
          <li key={day.id} data-identifier="session-date">
            <p>
              {day.weekday} - {day.date}
            </p>
            <ul>
              {day.showtimes.map((hour) => (
                <Link key={hour.id} to={`/seats/${hour.id}`}>
                  <Time
                    data-identifier="hour-minute-btn"
                    onClick={() => setTime(day.date, hour.name)}
                  >
                    {hour.name}
                  </Time>
                </Link>
              ))}
            </ul>
          </li>
        ))}
      </SessionList>
      <BottomBar img={sessions.posterURL} title={sessions.title} />
    </Body>
  );
}

const Body = styled.main`
  width: 100%;
  padding-top: 67px;

  display: flex;
  flex-direction: column;

  p {
    font-family: "Roboto", sans-serif;
    font-size: 24px;
    color: #293845;
    margin: 50px 0px 27px 0px;
    text-align: center;
  }
`;

const SessionList = styled.ul`
  margin-left: 30px;
  margin-bottom: 137px;
  p {
    font-family: "Roboto", sans-serif;
    font-size: 20px;
    color: #293845;
    margin: 23px 0px;
    text-align: initial;
  }

  ul {
    display: flex;
  }
`;

const Time = styled.li`
  width: 83px;
  height: 43px;

  background: #e8833a;
  border-radius: 3px;

  font-family: "Roboto", sans-serif;
  font-size: 18px;
  color: #ffffff;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-right: 10px;
`;
