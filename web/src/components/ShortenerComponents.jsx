import styled from "styled-components";

export const Title = styled.div`
  font-size: 40px;
  color: #eaebe3;
  align-items: bottom;
  z-index: 2;
  padding: 10px;
  text-shadow: 2px 2px black;
`;

export const Middle = styled.div`
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: stretch;
`;

export const UrlBox = styled.input`
  outline: none;
  background: #242329;
  border-radius: 0.25rem 0rem 0rem 0.25rem;
  font-size: 14px;
  padding: 3px;
  margin-bottom: 0.25rem;
  z-index: 2;
  border: 1px solid #353a3b;
  box-shadow: 2px 3px 8px #00000033;
  color: #ebebeb;
`;

export const GetShortButton = styled.div`
  outline: none;
  color: #eaebe3;
  text-shadow: 1.5px 1.5px black;
  background: #2c2b2e;
  border-radius: 0rem 0.25rem 0.25rem 0rem;
  font-size: 20px;
  padding: 3px;
  margin-bottom: 0.25rem;
  z-index: 2;
  border: 1px solid #353a3b;
  cursor: pointer;
  box-shadow: 2px 3px 8px #00000033;
  transition: all 222ms;
  color: #ebebeb;

  &:hover {
    border: 1px solid #eaebe333;
    transform: scale(1.05);
    border-radius: 0.4rem;
  }
`;

export const OutputBox = styled.input`
  outline: none;
  background: #242329;
  border-radius: 0.25rem;
  font-size: 14px;
  padding: 5px;
  margin-bottom: 0.4rem;
  z-index: 2;
  border: 1px solid #353a3b;
  box-shadow: 2px 3px 8px #00000033;
  color: #ebebeb;
`;

export const Checkbox = styled.input`
  
`;
