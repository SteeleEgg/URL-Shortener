const PageContainer = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: FranklinGothicMedium;
`
const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
`
const BackgroundImage =  styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  background-image: url(https://images.unsplash.com/photo-1653549892920-8c333905ca3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80);
  background-size: cover;
  background-postion: center;
  filter: blur(3px);
`
const Title = styled.div`
font-size: 40px;
color: #eaebe3;
align-items: bottom;
z-index: 2;
padding: 10px;
text-shadow: 2px 2px black;
`
const Middle = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
align-items: stretch;
`
const UrlBox = styled.input`
  outline: none;
  background: #242329;
  border-radius: 0.25rem 0rem 0rem 0.25rem;
  font-size: 14px;
  padding: 3px;
  margin-bottom: 0.25rem;
  z-index: 2;
  border: 1px solid #353a3b;
  box-shadow: 2px 3px 8px #00000033;
`
const GetShortButton = styled.div`
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

  &:hover {
    border: 1px solid #eaebe333;
    transform: scale(1.05);
    border-radius: 0.4rem;
  }
`
const OutputBox = styled.input`
  outline: none;
  background: #242329;
  border-radius: 0.25rem;
  font-size: 14px;
  padding: 5px;
  margin-bottom: 0.4rem;
  z-index: 2;
  border: 1px solid #353a3b;
  box-shadow: 2px 3px 8px #00000033;
`