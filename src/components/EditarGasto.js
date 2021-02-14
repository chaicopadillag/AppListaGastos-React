import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import BtnRegresar from '../elements/BtnRegresar';
import { Header, Titulo } from '../elements/Header';
import useObtenerGasto from '../hooks/useObtenerGasto';
import BarraTotalGastos from './BarraTotalGastos';
import FormularioGasto from './FormularioGasto';
const EditarGasto = () => {
    const {id}=useParams()
    const [gasto]= useObtenerGasto(id)

    return (
         <>
            <Helmet>
                <title>Editar Gasto</title>     
            </Helmet>
            <Header>
                <BtnRegresar ruta="/lista"/>
                <Titulo>Editando Gasto</Titulo>
            </Header>
            <FormularioGasto gasto={gasto}>                
            </FormularioGasto>
            <BarraTotalGastos/>
        </>
            );
}
 
export default EditarGasto;