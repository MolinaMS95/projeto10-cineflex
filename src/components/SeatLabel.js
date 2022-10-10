import styled from "styled-components";

export default function SeatLabel() {
  return (
    <SeatLegend>
      <div>
        <Seat isSelected={true} data-identifier="seat-selected-subtitle"></Seat>
        <Seat
          isAvailable={true}
          data-identifier="seat-available-subtitle"
        ></Seat>
        <Seat
          isAvailable={false}
          data-identifier="seat-unavailable-subtitle"
        ></Seat>
      </div>
      <span>
        <p data-identifier="seat-selected-subtitle">Selecionado</p>
        <p data-identifier="seat-available-subtitle">Disponível</p>
        <p data-identifier="seat-unavailable-subtitle">Indisponível</p>
      </span>
    </SeatLegend>
  );
}

const SeatLegend = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  width: 300px;
  padding: 0px;

  div {
    width: 300px;

    display: flex;
    justify-content: space-around;
  }

  span {
    width: 268px;

    display: flex;
    justify-content: space-between;
  }

  p {
    font-family: "Roboto", sans-serif;
    font-size: 13px;
    color: #4e5a65;
    margin: 0px;
  }

  li {
    margin-bottom: 0px;
  }
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
