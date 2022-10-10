import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function SuccessScreen(props) {
  const { movie, day, hour, selectedSeats, setSelectedSeats, name, cpf } =
    props;
  const seatArray = [];

  selectedSeats.forEach((seat, index) =>
    seatArray.push(<p key={index}>Assento: {seat}</p>)
  );

  const navigate = useNavigate();

  function goHome() {
    navigate("/");
    setSelectedSeats([]);
  }

  return (
    <Body>
      <Header>Pedido feito com sucesso!</Header>
      <div data-identifier="movie-session-infos-reserve-finished">
        <Title>Filme e sessão</Title>
        <p>{movie}</p>
        <p>
          {day} {hour}
        </p>
      </div>
      <div data-identifier="seat-infos-reserve-finished">
        <Title>Ingressos</Title>
        {seatArray}
      </div>
      <div data-identifier="buyer-infos-reserve-finished">
        <Title>Comprador</Title>
        <p>Nome: {name}</p>
        <p>
          CPF:{" "}
          {cpf.slice(0, 3) +
            "." +
            cpf.slice(3, 6) +
            "." +
            cpf.slice(6, 9) +
            "-" +
            cpf.slice(9, 11)}
        </p>
      </div>
      <button onClick={goHome} data-identifier="back-to-home-btn">
        Voltar para Home
      </button>
    </Body>
  );
}

const Body = styled.main`
  width: 100%;
  padding-top: 67px;

  display: flex;
  flex-direction: column;

  p {
    font-family: "Roboto";
    font-size: 22px;
    line-height: 26px;
  }

  div {
    margin-left: 29px;
  }

  button {
    width: 225px;
    height: 42px;
    margin-top: 47px;

    background: #e8833a;
    border: none;
    border-radius: 3px;

    font-family: "Roboto";
    font-size: 18px;
    color: #ffffff;

    align-self: center;
  }

  button:hover {
    cursor: pointer;
  }
`;

const Header = styled.p`
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 24px;
  color: #247a6b;
  margin: 50px 0px 0px 0px;
  text-align: center;
`;

const Title = styled(Header)`
  color: #293845;
  text-align: left;
  margin: 50px 0px 10px 0px;
`;
