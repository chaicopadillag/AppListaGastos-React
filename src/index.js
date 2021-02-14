import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import WebFont from 'webfontloader'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Contenedor from './elements/Contenedor';
import InicioSesion from './components/InicioSesion'
import RegistroUsuario from './components/RegistroUsuario'
import ListaGastos from './components/ListaGastos'
import GastosCategoria from './components/GastosCategoria'
import EditarGasto from './components/EditarGasto'
import { Helmet } from 'react-helmet';
import favicon from './img/logo.png'
import Fondo from './elements/Fondo';
import { AuthProvider } from './contexts/AuthContext';
import RoutePrivate from './components/RoutePrivate';
import { TotalGastoMesProvider } from './contexts/TotalGastoMesContext';


WebFont.load({
  google: {
    families: ['Roboto:400,500,700', 'sans-serif']
  }
});

const Index = () => {
  return (
    <>
    <Helmet>
      <link rel="shortcut icon" href={favicon} type="image/x-icon"/>
    </Helmet>
    <AuthProvider>
      <TotalGastoMesProvider>
        <BrowserRouter>
          <Contenedor> 
            <Switch>
              <Route path="/login" component={InicioSesion}/>
              <Route path="/registro" component={RegistroUsuario}/>
              <RoutePrivate path="/categorias">
                <GastosCategoria/>         
              </RoutePrivate>
              <RoutePrivate path="/lista">
                <ListaGastos/>         
              </RoutePrivate>
              <RoutePrivate path="/editar/:id">
                <EditarGasto/>         
              </RoutePrivate>
              <RoutePrivate path="/">
                <App/>         
              </RoutePrivate>
              {/* <Route path="/categorias" component={GastosCategoria}/>
              <Route path="/lista" component={ListaGastos}/>
              <Route path="/editar/:id" component={EditarGasto}/>
              <Route path="/" component={App}/> */}
            </Switch>
          </Contenedor>
        </BrowserRouter> 
      </TotalGastoMesProvider>     
    </AuthProvider>
    <Fondo/>
    </>
   )
}

ReactDOM.render( <Index/> , document.getElementById('root'));