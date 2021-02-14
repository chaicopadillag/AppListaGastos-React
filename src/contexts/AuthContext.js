import React, { useContext, useEffect, useState } from 'react';
import { auth } from '../firebase/firebaseConfig';
const AuthConext=React.createContext()

const useAuth=()=>{
    return useContext(AuthConext)
}

const AuthProvider = ({children}) => {
    const [sesion,cambiarSesion]=useState()
    const [cargando,cambiarCargando]=useState(true)

    useEffect(()=>{
       const sesionActive= auth.onAuthStateChanged(user=>{
            cambiarSesion(user)
            cambiarCargando(false)
        });

        return sesionActive;
    },[])
    return (
        <AuthConext.Provider value={{sesion:sesion}}>
            {!cargando&& children}
        </AuthConext.Provider>
    );
}
 
export {AuthProvider,AuthConext,useAuth};