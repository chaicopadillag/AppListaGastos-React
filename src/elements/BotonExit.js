import React from 'react';
import { useHistory } from 'react-router-dom';
import { auth } from '../firebase/firebaseConfig';
import {ReactComponent as IconoCerrarSesion}from './../img/log-out.svg'
import Boton from './Boton';
const BotonExit = () => {
    const history=useHistory()
    const cerrarSesion= async ()=>{
        try{
            await auth.signOut()
            history.push('/login')
        }catch(error){
            console.log(error)
        }
    }
    return ( 
        <Boton iconoGrande as="button" onClick={cerrarSesion}>
            <IconoCerrarSesion/>
        </Boton>
     );
}
 
export default BotonExit;