import React from 'react';
import styled from 'styled-components';


const CountUpDownBlock = styled.div`
  width: 98px;
  height: 38px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  button {
    background: transparent;
    border: none;
    outline: none;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
    cursor: pointer;
  }
  span {
    margin: 0;
    font-family: 'Roboto';
    font-size: 15px;
    font-weight: bold;
  }
`;

const CountUpDown = ({ count, onUpClick, onDownClick }) => {
  return (
    <CountUpDownBlock>
      <button onClick={onDownClick}>
        제거
      </button>
      <span>{count}</span>
      <button onClick={onUpClick}>
        추가
      </button>
    </CountUpDownBlock>
  );
};

export default CountUpDown;