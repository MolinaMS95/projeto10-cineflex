import { BrowserRouter, Route, Routes } from "react-router-dom";
import GlobalStyle from "../assets/GlobalStyle";
import ChooseMovieScreen from "./ChooseMovieScreen";
import MovieSessions from "./MovieSessions";
import SeatsScreen from "./SeatsScreen";
import SuccessScreen from "./SuccessScreen";
import TopBar from "./TopBar";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <TopBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ChooseMovieScreen />} />
          <Route path="/sessions/:idFilm" element={<MovieSessions />} />
          <Route path="/seats/:idSession" element={<SeatsScreen />} />
          <Route path="/sucess" element={<SuccessScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
