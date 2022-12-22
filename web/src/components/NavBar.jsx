import styled from "styled-components";

export const NavbarContainer = styled.div`
    position: absolute;
    top: 0; 
    left: 0;
    right: 0; 
    width: 100%;
    z-index: 1000;
    box-shadow: 0 4px 8px #00000033;
    background: #1b1b1b;
    color: #ebebeb;
    font-family: sans-serif;

    display: flex;
    justify-content: space-between;
    align-items: center;
`

export const NavbarWrapper = styled.div`
    display: flex;
    justify-content: ${p => p.position == "right" ? "flex-end" : "flex-start"};
    align-items: center;
    grid-gap: 8px;
    padding: 16px;
`

export const NavbarItem = styled.div`
    border: 1px solid #ebebeb;
    padding: 8px 16px;
    border-radius: 8px;
    transition: all 222ms;

    &:hover {
        color: #1b1b1b;
        background: #ebebeb;
    }
`