import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export default function TopBar({ initialPage, setInitialPage }) {
  const navigate = useNavigate();

  function goBack(){
    setInitialPage(true);
    navigate(-1);
  }

  return (
    <Header>
      {!initialPage && (
        <button onClick={goBack}>
          <ion-icon name="arrow-back-outline"></ion-icon>
        </button>
      )}
      CINEFLEX
    </Header>
  );
}

const Header = styled.header`
  width: 100%;
  height: 67px;

  background: #c3cfd9;

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: "Roboto", sans-serif;
  font-size: 34px;
  color: #e8833a;

  position: fixed;
  left: 0px;
  top: 0px;
  z-index: 2;

  button {
    position: absolute;
    left: 0px;
    top: 20px;
    z-index: 1000;

    border: none;
    background: none;

    font-size: 25px;
  }

  button:hover {
    cursor: pointer;
  }
`;
