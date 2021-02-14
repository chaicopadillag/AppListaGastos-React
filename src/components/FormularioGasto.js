import React, { useEffect, useState } from 'react';
import Boton from '../elements/Boton';
import { ContenedorBoton, ContenedorFiltros, Formulario, Input, InputGrande } from '../elements/ElementosFormulario';
import agregarGasto from '../firebase/agregarGasto';
import {ReactComponent as IconoPlus} from './../img/plus.svg'
import DatePicker from './DatePicker';
import SelectCategorias from './SelectCategorias';
import fromUnixTime from 'date-fns/fromUnixTime'
import getUnixTime from 'date-fns/getUnixTime'
import { useAuth } from '../contexts/AuthContext';
import Alerta from '../elements/Alerta';
import { useHistory } from 'react-router-dom';
import updateGasto from '../firebase/updateGasto';

const FormularioGasto = ({gasto}) => {

    const [inputDescripcion,cambiarInputDescrion]=useState('')
    const [inputGasto,cambiarInputGasto]=useState('')
    const [categoria,cambiarCategoria]=useState('hogar')
    const [fecha,cambiarFecha]=useState(new Date())
    const {sesion}=useAuth()
    const [estadoAlert,cambiarEstadoAlert]=useState(false)
    const [mensajeAlert,cambiarMensajeAlert]=useState({})
    const history=useHistory()
    useEffect(()=>{
        if(gasto){
            if(sesion.uid===gasto.data().uid){
                cambiarCategoria(gasto.data().categoria)
                cambiarFecha(fromUnixTime(gasto.data().fecha))
                cambiarInputDescrion(gasto.data().descripcion)
                cambiarInputGasto(gasto.data().valor)
            }else{
                cambiarEstadoAlert(true)
                cambiarMensajeAlert({
                    tipo:'error',
                    mensaje:'No tiene permiso para editar el registro'
                })
                setTimeout(()=>{
                    history.push('/lista')
                },1000)
            }
        }
    },[gasto,sesion])
    const handleChange=(e)=>{
        if(e.target.name==='descripcion') cambiarInputDescrion(e.target.value)
        if(e.target.name==='gasto') cambiarInputGasto(e.target.value.replace(/[^0-9.]/g,''))
    }
    const enviarGasto=(e)=>{
        e.preventDefault()
        if(inputDescripcion!==''&&inputGasto!==''){
            let valor=parseFloat(inputGasto).toFixed(2),
            fecha_gasto=getUnixTime(fecha);  
            if(!valor){
                cambiarEstadoAlert(true)
                cambiarMensajeAlert({
                    tipo:'warning',
                    mensaje:'El valor del gasto ingresado no es valido'
                })
                return
            }
            if(gasto){
                let myGasto={
                    descripcion:inputDescripcion,
                    valor:Number(valor),
                    categoria,
                    fecha: fecha_gasto
                }
                updateGasto({id:gasto.id,gasto:myGasto})
                .then(()=>{                    
                    cambiarEstadoAlert(true)
                    cambiarMensajeAlert({
                        tipo:'exito',
                        mensaje:'El Gasto se ha actualizado correctamente'
                    })
                    setTimeout(()=>{history.push('/lista')},1000)
                })
                .catch(error=>{              
                   cambiarEstadoAlert(true)
                    cambiarMensajeAlert({
                        tipo:'error',
                        mensaje: `Error al agregar gasto, ERROR:${error}`
                    })
                })
            }else{
                let myGasto={
                    uid:sesion.uid,
                    descripcion:inputDescripcion,
                    valor:Number(valor),
                    categoria,
                    fecha: fecha_gasto
                }
                agregarGasto({gasto:myGasto})
                .then(()=>{
                    cambiarInputDescrion('')
                    cambiarInputGasto('')
                    cambiarCategoria('hogar')
                    cambiarFecha(new Date())
                    cambiarEstadoAlert(true)
                    cambiarMensajeAlert({
                        tipo:'exito',
                        mensaje:'Gasto agregado correctamente'
                    })
                })
                .catch(error=>{              
                   cambiarEstadoAlert(true)
                    cambiarMensajeAlert({
                        tipo:'error',
                        mensaje: `Error al agregar gasto, ERROR:${error}`
                    })
                })
            }
        }else{
            cambiarEstadoAlert(true)
            cambiarMensajeAlert({
                tipo:'warning',
                mensaje:'Por favor completa todos los campos'
            })
        }
    }

    return (
        <Formulario onSubmit={enviarGasto} method="POST">
            <ContenedorFiltros>
                <SelectCategorias categoria={categoria} cambiarCategoria={cambiarCategoria}/>
                <DatePicker fecha={fecha} cambiarFecha={cambiarFecha}/>
            </ContenedorFiltros>
            <div>
                <Input type="tex" name="descripcion" id="descripcion" placeholder="Descripcion" value={inputDescripcion} onChange={handleChange}/>
                <InputGrande type="tex" name="gasto" id="gasto" placeholder="00.00" value={inputGasto} onChange={handleChange}/>
            </div>
            <ContenedorBoton>
                <Boton as="button" primario conIcono type="submit">{gasto?'Actualizar Gasto':'Agregar Gasto'}
                    <IconoPlus/>
                </Boton>
            </ContenedorBoton>
            <Alerta 
            tipo={mensajeAlert.tipo} 
            mensaje={mensajeAlert.mensaje}
            estadoAlerta={estadoAlert}
            cambiarEstadoAlerta={cambiarEstadoAlert}
            />
        </Formulario>
    );
}
 
export default FormularioGasto;