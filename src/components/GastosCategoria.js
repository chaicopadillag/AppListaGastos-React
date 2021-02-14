import React from 'react';
import { Helmet } from 'react-helmet';
import BtnRegresar from '../elements/BtnRegresar';
import { Categoria, ElementoLista, ElementoListaCategorias, ListaDeCategorias, Valor } from '../elements/ElementosLista';
import { ContenedorHeader, Header, Titulo } from '../elements/Header';
import InconoCategoria from '../elements/IconoCategoria';
import formatearMoneda from '../funciones/convertirMoneda';
import useGastoMes from '../hooks/useGastosMes';
import useObtenerGastoMesCategoria from '../hooks/useObtenerGastoMesCategoria';
import BarraTotalGastos from './BarraTotalGastos';
const GastosCategoria = () => {
    const gastosMesCategoria= useObtenerGastoMesCategoria()
    return ( 
    <>
    <Helmet>
        <title>Gastos por Categoria</title>     
    </Helmet>
    <Header>
        <BtnRegresar/>
        <Titulo>Gastos por Categorias</Titulo>
    </Header>
    <ListaDeCategorias>
        {gastosMesCategoria.map((elemento, indice)=>{
            return (
                <ElementoListaCategorias key={indice}>
                    <Categoria><InconoCategoria id={elemento.categoria}/>{elemento.categoria}</Categoria>
                    <Valor>{formatearMoneda(elemento.valor)}</Valor>
                </ElementoListaCategorias>
            )
        })}
    </ListaDeCategorias>
    <BarraTotalGastos/>
   </>
     );
}
 
export default GastosCategoria;