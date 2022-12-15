import { useState, useRef } from 'react'
import styled from 'styled-components'
import { Title, UrlBox, Middle, GetShortButton, OutputBox } from './components/ShortenerComponents'
import { NavbarContainer, NavbarWrapper, NavbarItem } from './components/NavBar'
import Shortener from './pages/shortener'
import Login from './pages/Login'
import Redirector from './pages/Redirector.jsx'
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'

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
const BackgroundImage = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  background-image: url(https://images.unsplash.com/photo-1653549892920-8c333905ca3b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80);
  background-size: cover;
  background-position: cover;
  filter: blur(3px);
`

function App() {

  const navigate = useNavigate()

  console.log(import.meta.env.VITE_SHORTENER_URL)

  return (
    <PageContainer>
      <PageWrapper>
        <BackgroundImage/>
        <NavbarContainer>
          <NavbarWrapper>
            <div>Logo</div>
            <NavbarItem onClick={() => navigate('/')}>Home</NavbarItem>
          </NavbarWrapper>
          <NavbarWrapper  position="right">
            <NavbarItem onClick={() => navigate('/my-urls')}>My Urls</NavbarItem>
            <NavbarItem onClick={() => navigate('/login')}>Log In</NavbarItem>
          </NavbarWrapper>
        </NavbarContainer>
        <Routes>
          <Route path='/' element={<Shortener />} />
          <Route path='/login' element={<Login />} />
          <Route path='/my-urls' element={<>My URLs Page</>} />
          <Route path='/u/:id' element={<Redirector />} />
        </Routes>
      </PageWrapper>
    </PageContainer>
  )
}
export default App
