import React from 'react';
import styled from 'styled-components';
import theme from '../theme';
import {ReactComponent as Puntos} from './../img/puntos.svg'

const Svg = styled.svg`
    height: 50vh;
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: 0;
    path {
        fill: #0099ff;
    }
`;
 
const PuntosArriba = styled(Puntos)`
    position: fixed;
    z-index: 1;
    top: 2.5rem; /* 40px */
    left: 2.5rem; /* 40px */
`;
 
const PuntosAbajo = styled(Puntos)`
    position: fixed;
    z-index: 1;
    bottom: 2.5rem; /* 40px */
    right: 2.5rem; /* 40px */
`;
const ParrajoDev=styled.p`
text-align:center;
color: white;
font-size: 1rem; /* 20px */
position:absolute;
bottom:30px;
display:block;
width:100%;
`;
const Developer = styled.a`
text-decoration:none;
color: crimson;
font-weight:bold;
`;

const Fondo = () => {
    return ( 
        <>
        <PuntosArriba/>
        
        <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"  preserveAspectRatio="none">
            <path
            fillOpacity="1" 
            d="M0,96L40,122.7C80,149,160,203,240,218.7C320,235,400,213,480,176C560,139,640,85,720,90.7C800,96,880,160,960,170.7C1040,181,1120,139,1200,138.7C1280,139,1360,181,1400,202.7L1440,224L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path>
            </Svg>            
        <PuntosAbajo/>
        <ParrajoDev>Desarrollador por <Developer href="https://chaicopadillag.github.io/" target="_blank">G. Chaico P.</Developer>
        </ParrajoDev>
        </>
     );
}
 
export default Fondo;