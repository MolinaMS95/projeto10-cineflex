import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../assets/GlobalStyle";
import ChooseMovieScreen from "./ChooseMovieScreen";
import MovieSessions from "./MovieSessions";
import SeatsScreen from "./SeatsScreen";
import SuccessScreen from "./SuccessScreen";
import TopBar from "./TopBar";

export default function App() {
  const [movie, setMovie] = useState(undefined);
  const [day, setDay] = useState(undefined);
  const [hour, setHour] = useState(undefined);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [name, setName] = useState([]);
  const [cpf, setCpf] = useState([]);
  const [initialPage, setInitialPage] = useState(true);

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <TopBar initialPage={initialPage} setInitialPage={setInitialPage}/>
        <Routes >
          <Route path="/" element={<ChooseMovieScreen setMovie={setMovie} />} />
          <Route
            path="/sessions/:idFilm"
            element={<MovieSessions setDay={setDay} setHour={setHour} setInitialPage={setInitialPage}/>}
          />
          <Route
            path="/seats/:idSession"
            element={
              <SeatsScreen
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                name={name}
                setName={setName}
                cpf={cpf}
                setCpf={setCpf}
                setInitialPage={setInitialPage}
              />
            }
          />
          <Route
            path="/sucess"
            element={
              <SuccessScreen
                movie={movie}
                day={day}
                hour={hour}
                selectedSeats={selectedSeats}
                setSelectedSeats={setSelectedSeats}
                name={name}
                setName={setName}
                setCpf={setCpf}
                cpf={cpf}
                setInitialPage={setInitialPage}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}
