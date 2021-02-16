import styled from "styled-components";

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.21);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity 300ms;
    
    &.open {
        opacity: 1;
        pointer-events: initial;
    }
`;

export default Container;
