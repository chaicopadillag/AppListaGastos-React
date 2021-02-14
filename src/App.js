import React from 'react';
import { Helmet } from 'react-helmet';
import BarraTotalGastos from './components/BarraTotalGastos';
import FormularioGasto from './components/FormularioGasto';
import Boton from './elements/Boton';
import BotonExit from './elements/BotonExit';
import { ContenedorBotones, ContenedorHeader, Header, Titulo } from './elements/Header';

const App = () => {
  
  return ( 
   <>
   <Helmet>
     <title>Agregar Gasto</title>     
   </Helmet>
   <Header>
     <ContenedorHeader>
       <Titulo>Agregar Gasto</Titulo>
       <ContenedorBotones>
         <Boton to="/categorias">Categorias</Boton>
         <Boton to="/lista">Lista Gastos</Boton>
         <BotonExit/>
       </ContenedorBotones>
     </ContenedorHeader>
   </Header>
   <FormularioGasto/>
   <BarraTotalGastos/>
   </>
   );
}
 
export default App;