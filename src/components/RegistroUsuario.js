import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import Boton from '../elements/Boton';
import { ContenedorBoton, Formulario, Input } from '../elements/ElementosFormulario';
import { ContenedorHeader, Header, Titulo } from '../elements/Header';
import {ReactComponent as SvgLogin} from './../img/registro.svg'
import {auth} from './../firebase/firebaseConfig'
import { useHistory } from 'react-router-dom';
import Alerta from './../elements/Alerta';

const Svg=styled(SvgLogin)`
width:100%;
max-height:6.25rem;
margin-bottom:1.25rem;
`;

const RegistroUsuario = () => {
    const myHistory=useHistory()
    const [correo,establecerCorreo]=useState('')
    const [password,establecerPassword]=useState('')
    const [password2,establecerPassword2]=useState('')
    const [estadoAlert,cambiarEstadoAlert]=useState(false)
    const [alertMensaje,cambiarAlertMensaje]=useState({})

    const detectarCambio=(e)=>{
        switch (e.target.name) {
            case 'correo':
                establecerCorreo(e.target.value)
                break
            case 'password':
                establecerPassword(e.target.value)
                break
            default:
                establecerPassword2(e.target.value)
                break
        }
    }
    const crearCuenta = async (e)=>{
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

        if(correo===''||password===''||password2===''){      
            cambiarEstadoAlert(true)
            cambiarAlertMensaje({
               tipo:'warning',
               mensaje:'Por favor llene todos sus datos'
            })
            return 
        }
        if(password.length<6){
            cambiarEstadoAlert(true)
            cambiarAlertMensaje({
               tipo:'warning',
               mensaje:'La contraseña debe tener al menos 6 dígitos'
            })
            return 
        }
        if( password!==password2){
            cambiarEstadoAlert(true)
            cambiarAlertMensaje({
               tipo:'warning',
               mensaje:'Las contraseñas no son iguales'
            })
            return 
        }

        try {
            await auth.createUserWithEmailAndPassword(correo.toUpperCase(),password);            
            myHistory.push('/')
        } catch (error) {
            let mensaje=error.code;            
            switch (mensaje) {
                case 'auth/invalid-password':
                    mensaje='La contraseña debe ser al menos 6 caracteres'                    
                    break;
                case 'auth/weak-password':
                    mensaje='La contraseña debe ser al menos 6 caracteres'
                    break;
                case 'auth/email-already-in-use':
                    mensaje = 'Ya existe una cuenta con el correo electrónico ingresado.'
                break;
                case 'auth/invalid-email':
                    mensaje = 'El correo electrónico no es válido.'
                break;
                case 'auth/network-request-failed':
                    mensaje='Se ha producido un error de red (como tiempo de espera, conexión interrumpida o host inaccesible).'
                    break;
                default:
                    mensaje = 'Hubo un error al intentar crear la cuenta.'
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
            <title>Registro de Usuario</title>
        </Helmet>
        <Header>
            <ContenedorHeader>
                <Titulo>App Lista de Gastos</Titulo>
                <div>
                    <Boton to="/login">Iniciar Sesion</Boton>
                </div>
            </ContenedorHeader>
        </Header>
        <Formulario onSubmit={crearCuenta}>
            <Svg/>
            <Input 
            type="email" 
            name="correo" 
            placeholder="Correo Electrónico" 
            value={correo} onChange={detectarCambio}/>
            <Input 
            type="password" 
            name="password" 
            placeholder="Contraseña" 
            value={password} onChange={detectarCambio}/>
            <Input 
            type="password" 
            name="password2" 
            placeholder="Confirmar contraseña" 
            value={password2} onChange={detectarCambio}/>
            <ContenedorBoton>
                <Boton as="button" primario type="submit">Crear cuenta</Boton>
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
 
export default RegistroUsuario;