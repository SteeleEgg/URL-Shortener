import styled from "styled-components";

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  background-color: #a8a8a833;
  z-index: 2;
  border-radius: 5px;
  padding: 16px;
  backdrop-filter: blur(20px);
`
export const Button = styled.div`
  outline: none;
  color: #eaebe3;
  text-shadow: 1.5px 1.5px black;
  background: #2c2b2e;
  border-radius: 0.25rem;
  font-size: 20px;
  padding: 3px;
  margin-bottom: 0.25rem;
  z-index: 2;
  border: 1px solid #353a3b;
  cursor: pointer;
  box-shadow: 2px 3px 8px #00000033;
  transition: all 222ms;
  flex: 1;
  text-align: center;

  &:hover {
    border: 1px solid #eaebe333;
    transform: scale(1.05);
    border-radius: 0.4rem;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  border-radius: 5px;
  padding: 5px;
  grid-gap: 8px;
`