import React from 'react';
import { Helmet } from 'react-helmet';
import { Header, Titulo } from '../elements/Header';
import BtnRegresar from '../elements/BtnRegresar';
import BarraTotalGastos from './BarraTotalGastos';
import useObtnerGastos from '../hooks/useObtenerGastos';
import { BotonAccion, BotonCargarMas, Categoria, ContenedorBotonCentral, ContenedorBotones, ContenedorSubtitulo, Descripcion, ElementoLista, Fecha, Lista, Subtitulo, Valor } from '../elements/ElementosLista';
import InconoCategoria from '../elements/IconoCategoria';
import formatearMoneda from '../funciones/convertirMoneda';
import {ReactComponent as IconoEditar} from './../img/editar.svg'
import {ReactComponent as IconoEliminar} from './../img/borrar.svg'
import { Link } from 'react-router-dom';
import Boton from '../elements/Boton';
import { fromUnixTime } from 'date-fns/esm';
import { format } from 'date-fns';
import {es} from 'date-fns/locale'
import eliminarGasto from '../firebase/eliminarGasto';

const ListaGatos = () => {
    const [gastos,cargarMasGastos,checkMasCargar]=useObtnerGastos();
    const formatearFecha=(fecha)=>{
        let fechaJs=fromUnixTime(fecha)
       return format(fechaJs,"dd 'de' MMMM 'del' yyyy",{locale:es})
    }

    return (
        <>
    <Helmet>
        <title>Lista Gatos</title>     
    </Helmet>
    <Header>
        <BtnRegresar/>
        <Titulo>Lista de Gastos</Titulo>
    </Header>
    <Lista>
        {gastos.map((gasto,indice)=>{
            const fechaEsIgual=(gastos,indice,gasto)=>{
                if(indice!==0){
                    let fechaActual=formatearFecha(gasto.fecha),
                    fechaAnterior=formatearFecha(gastos[indice-1].fecha);
                    if(fechaAnterior===fechaActual){
                        return true
                    }else{
                        return false
                    }
                }
            }
            return(
               <div key={indice}>
                   {!fechaEsIgual(gastos,indice,gasto)&&
                    <Fecha>{formatearFecha(gasto.fecha)}</Fecha>
                   }
                    <ElementoLista key={gasto.id}>
                        <Categoria>
                            <InconoCategoria id={gasto.categoria}/>
                            {gasto.categoria}
                        </Categoria>
                        <Descripcion>
                        {gasto.descripcion}
                        </Descripcion>
                        <Valor>{formatearMoneda(gasto.valor)}</Valor>
                        <ContenedorBotones>
                            <BotonAccion as={Link} to={`/editar/${gasto.id}`}><IconoEditar/></BotonAccion>
                            <BotonAccion onClick={()=>eliminarGasto(gasto.id)}><IconoEliminar/></BotonAccion>
                        </ContenedorBotones>
                    </ElementoLista>
               </div>
            )
        })}
        {checkMasCargar&&
        <ContenedorBotonCentral>
            <BotonCargarMas onClick={()=>cargarMasGastos()}>Cargar más</BotonCargarMas>
        </ContenedorBotonCentral>
        }
        {gastos.length<=0&&
        <ContenedorSubtitulo>
            <Subtitulo>No hay gastos que mostrar</Subtitulo>
            <Boton as={Link} to="/">Agregar Gasto</Boton>
        </ContenedorSubtitulo>
        }
    </Lista>    
    <BarraTotalGastos/>
   </>
    );
} 
export default ListaGatos;