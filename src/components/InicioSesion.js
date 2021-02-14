import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import Alerta from '../elements/Alerta';
import Boton from '../elements/Boton';
import { ContenedorBoton, Formulario, Input } from '../elements/ElementosFormulario';
import { ContenedorHeader, Header, Titulo } from '../elements/Header';
import { auth } from '../firebase/firebaseConfig';

import {ReactComponent as SvgLogin} from './../img/login.svg'

const Svg=styled(SvgLogin)`
width:100%;
max-height:12.5rem;
margin-bottom:1.25rem;
`;
const InicioSesion = () => {
    const myHistory=useHistory()
    const [correo,establecerCorreo]=useState('')
    const [password,establecerPassword]=useState('')
    const [estadoAlert,cambiarEstadoAlert]=useState(false)
    const [alertMensaje,cambiarAlertMensaje]=useState({})

    const detectarCambiosInputs=(e)=>{
        if(e.target.name==='correo') establecerCorreo(e.target.value)
        if(e.target.name==='contrasenia') establecerPassword(e.target.value)
    }

     const iniciarSesion = async (e)=>{
        e.preventDefault()
        cambiarEstadoAlert(false)
        cambiarAlertMensaje({})

        const emailCheck=/[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

        if(!emailCheck.test(correo)){ 
           cambiarEstadoAlert(true)
           cambiarAlertMensaje({
               tipo:'warning',
               mensaje:'Por favor ingrese un correo electronico valido'
           })
            return 
        }

        if(correo===''||password===''){      
            cambiarEstadoAlert(true)
            cambiarAlertMensaje({
               tipo:'warning',
               mensaje:'Por favor llene todos sus campos'
            })
            return 
        } 
        
        try {
            await auth.signInWithEmailAndPassword(correo.toUpperCase(),password);
            myHistory.push('/')
        } catch (error) {
            let mensaje=error.code;     
            switch (mensaje) {
                case 'auth/user-not-found':
                    mensaje='El usuario con el correo electrónico no existe.'                    
                    break;
                case 'auth/wrong-password':
                    mensaje='El correo electrónico ó la contraseña es incorrecto.'
                    break;
                case 'auth/network-request-failed':
                    mensaje='Se ha producido un error de red (como tiempo de espera, conexión interrumpida o host inaccesible).'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar iniciar sesión.'
                break;
            }
            cambiarEstadoAlert(true)
            cambiarAlertMensaje({
               tipo:'error',
               mensaje:mensaje
            })
        }
        
    }

    return (
        <>
        <Helmet>
            <title>Login</title>
        </Helmet>
        <Header>
            <ContenedorHeader>
                <Titulo>App Lista de Gastos</Titulo>
                <div>
                    <Boton to="/registro">Registrarse</Boton>
                </div>
            </ContenedorHeader>
        </Header>
        <Formulario onSubmit={iniciarSesion}>
            <Svg/>
            <Input type="email" name="correo" placeholder="Correo Electrónico" value={correo} onChange={detectarCambiosInputs}/>
            <Input type="password" name="contrasenia" placeholder="Contraseña" value={password} onChange={detectarCambiosInputs}/>
            <ContenedorBoton>
                <Boton as="button" primario type="submit">Iniciar Sesion</Boton>
            </ContenedorBoton>
        </Formulario>
        <Alerta
        tipo={alertMensaje.tipo}
        mensaje={alertMensaje.mensaje}
        estadoAlerta={estadoAlert}
        cambiarEstadoAlerta={cambiarEstadoAlert}
        />
        </>
    );
}
 
export default InicioSesion;