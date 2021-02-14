import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
const RoutePrivate = ({children,...restoProp}) => {
    const {sesion}=useAuth()
    if(sesion){
        return <Route {...restoProp}>{children}</Route>
    }else{
        return <Redirect to="login"/>
    }
}
 
export default RoutePrivate;