import styled from "styled-components";

export default function TopBar() {
  return <Header>CINEFLEX</Header>;
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
  z-index: 2;
`;
