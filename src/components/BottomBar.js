import styled from "styled-components";

export default function BottomBar(props) {
  const { img, title } = props;
  return (
    <Footer>
      <div>
        <img src={img} alt={title} />
      </div>
      {title}
    </Footer>
  );
}

const Footer = styled.div`
  width: 100%;
  height: 117px;

  background: #dfe6ed;
  border: 1px solid #9eadba;

  position: fixed;
  right: 0px;
  bottom: 0px;

  display: flex;
  align-items: center;

  div {
    width: 64px;
    height: 89px;

    background: #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0px 14px;
  }

  img {
    width: 48px;
    height: 72px;
  }

  font-family: "Roboto", sans-serif;
  font-size: 26px;
  color: #293845;
`;
