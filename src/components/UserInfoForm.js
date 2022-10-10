import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function UserInfoForm(props) {
  const { selected, name, setName, cpf, setCpf } = props;

  const url = "https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many";
  const navigate = useNavigate();

  function bookSeats(event) {
    event.preventDefault();

    const object = {
      ids: selected,
      name: name,
      cpf: cpf,
    };

    const promise = axios.post(url, object);
    promise.then(() => navigate("/sucess"));
    
    promise.catch(() =>
      alert("Estamos com dificuldades no momento, tente mais tarde")
    );
  }

  return (
    <Form onSubmit={bookSeats}>
      <label htmlFor="name">Nome do comprador:</label>
      <input
        data-identifier="buyer-name-input"
        id="name"
        name="name"
        placeholder="Digite seu nome..."
        onChange={(e) => setName(e.target.value)}
        required
      />
      <label htmlFor="CPF">CPF do comprador:</label>
      <input
        data-identifier="buyer-cpf-input"
        id="CPF"
        name="CPF"
        placeholder="Digite seu CPF (apenas números)..."
        pattern="[0-9]{11}"
        onChange={(e) => setCpf(e.target.value)}
        required
      />
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
`;
