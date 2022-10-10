import styled from "styled-components";
import loading from "../assets/loading.gif";
import errorImg from "../assets/errorImg.gif";
import axios from "axios";
import BottomBar from "./BottomBar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import UserInfoForm from "./UserInfoForm";
import SeatLabel from "./SeatLabel";

export default function SeatsScreen(props) {
  const { idSession } = useParams();
  const url = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${idSession}/seats`;

  const {
    selectedSeats,
    setSelectedSeats,
    name,
    setName,
    cpf,
    setCpf,
    setInitialPage,
  } = props;

  const [seats, setSeats] = useState(null);
  const [error, setError] = useState(false);
  const [movieInfo, setMovieInfo] = useState(null);
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    const promise = axios.get(url);

    promise.then((response) => {
      setSeats(response.data.seats);
      setMovieInfo(response.data);
    });

    promise.catch(() => {
      alert("Não foi possível carregar os assentos para esta sessão");
      setError(true);
    });

    setInitialPage(false);
    setSelected([]);
    setSelectedSeats([]);
    setName([]);
    setCpf([]);
  }, [url, setInitialPage, setSelected, setSelectedSeats, setName, setCpf]);

  if (error) {
    return (
      <Body>
        <p>Recarregue a página e tente novamente</p>
        <img src={errorImg} alt="gif comendo pipoca" />
      </Body>
    );
  }

  if (seats === null || movieInfo === null) {
    return (
      <Body>
        <img src={loading} alt="gif carregando" />
      </Body>
    );
  }

  function handleSeat(seatId, seatAvailable, seatName) {
    if (!seatAvailable) {
      alert("Esse assento não está disponível");
      return;
    }
    if (!selected.includes(seatId)) {
      setSelected([...selected, seatId]);
      setSelectedSeats([...selectedSeats, seatName]);
    } else {
      if (confimation(seatId)) {
        const newSelected = selected.filter((seat) => !(seat === seatId));
        setSelected(newSelected);
        const newSelectedSeats = selectedSeats.filter(
          (seat) => !(seat === seatName)
        );
        setSelectedSeats(newSelectedSeats);
      }
    }
  }

  function confimation(seatId) {
    const index = selected.indexOf(seatId);
    if (
      (name[index] !== undefined && name[index] !== "") ||
      (cpf[index] !== undefined && cpf[index] !== "")
    ) {
      if (window.confirm("Gostaria realmente de remover o assento?") === true) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  return (
    <Body>
      <Header>Selecione o(s) assento(s)</Header>
      <SeatMap>
        {seats.map((seat) => (
          <Seat
            key={seat.id}
            isAvailable={seat.isAvailable}
            onClick={() => handleSeat(seat.id, seat.isAvailable, seat.name)}
            isSelected={selected.includes(seat.id)}
            data-identifier="seat"
          >
            {seat.name}
          </Seat>
        ))}
      </SeatMap>
      <SeatLabel />
      <UserInfoForm
        selected={selected}
        name={name}
        setName={setName}
        cpf={cpf}
        setCpf={setCpf}
      />
      <BottomBar img={movieInfo.movie.posterURL} title={movieInfo.movie.title}>
        {movieInfo.day.weekday} - {movieInfo.name}
      </BottomBar>
    </Body>
  );
}

const Body = styled.main`
  width: 100%;
  padding-top: 67px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.p`
  font-family: "Roboto", sans-serif;
  font-size: 24px;
  color: #293845;
  margin: 15px 0px 25px 0px;
  text-align: center;
`;

const SeatMap = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  padding: 0px 22px;
`;

const Seat = styled.li`
  width: 26px;
  height: 26px;

  margin-right: 7px;
  margin-bottom: 18px;

  background: ${(props) =>
    props.isSelected ? "#1AAE9E" : props.isAvailable ? "#c3cfd9" : "#FBE192"};
  border: 1px solid #808f9d;
  border-radius: 12px;

  font-family: "Roboto", sans-serif;
  font-size: 11px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    cursor: pointer;
  }
`;
