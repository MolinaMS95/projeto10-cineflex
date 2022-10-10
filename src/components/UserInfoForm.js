import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function UserInfoForm(props) {
  const { selected, name, setName, cpf, setCpf } = props;

  const url = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";
  const navigate = useNavigate();

  const inputs = [];

  function handleName(value, index) {
    const newNamesArray = [...name];
    newNamesArray[index] = value;
    setName(newNamesArray);
  }

  function handleCPF(value, index) {
    const newCPFArray = [...cpf];
    newCPFArray[index] = value;
    setCpf(newCPFArray);
  }

  selected.forEach((seatId, index) =>
    inputs.push(
      <div key={index}>
        <label htmlFor={`name${index}`}>Nome do comprador {index + 1}:</label>
        <input
          data-identifier="buyer-name-input"
          id={`name${index}`}
          name="name"
          placeholder="Digite seu nome..."
          onChange={(e) => handleName(e.target.value, index)}
          required
        />
        <label htmlFor={`CPF${index}`}>CPF do comprador {index + 1}:</label>
        <input
          data-identifier="buyer-cpf-input"
          id={`CPF${index}`}
          name="CPF"
          placeholder="Digite seu CPF (apenas números)..."
          pattern="[0-9]{11}"
          onChange={(e) => handleCPF(e.target.value, index)}
          required
        />
      </div>
    )
  );

  function bookSeats(event) {
    event.preventDefault();

    const buyers = [];
    selected.forEach(
      (seatId, index) =>
        (buyers[index] = {
          idAssento: seatId,
          nome: name[index],
          cpf: cpf[index],
        })
    );

    const object = {
      ids: selected,
      compradores: buyers,
    };

    const promise = axios.post(url, object);
    promise.then(() => navigate("/sucess"));

    promise.catch(() =>
      alert("Estamos com dificuldades no momento, tente mais tarde")
    );
  }

  return (
    <Form onSubmit={bookSeats}>
      {inputs}
      <button type="submit" data-identifier="reservation-btn">
        Reservar assento(s)
      </button>
    </Form>
  );
}

const Form = styled.form`
  display: flex;
  flex-direction: column;

  width: 327px;
  margin-top: 30px;
  padding-bottom: 137px;

  overflow-y: auto;

  label {
    font-family: "Roboto", sans-serif;
    font-size: 18px;
    color: #293845;
  }

  input {
    height: 51px;
    border: 1px solid #d5d5d5;
    border-radius: 3px;
    margin-bottom: 10px;
  }

  input::placeholder {
    font-family: "Roboto";
    font-style: italic;
    font-size: 18px;
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

  div {
    display: flex;
    flex-direction: column;
  }
`;
