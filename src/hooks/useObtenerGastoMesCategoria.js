import React, { useEffect, useState } from 'react';
import useGastoMes from './useGastosMes';

const useObtenerGastoMesCategoria = () => {
    const [gastosPorCategoria,cambiarGastosCategoria]=useState([])
    const gastos=useGastoMes()
useEffect(()=>{
    const sumaGastos= gastos.reduce((objResult,objActual)=>{
         let categoriaActual=objActual.categoria,
             valorActual=objActual.valor;
             objResult[categoriaActual]+=valorActual
             return objResult
     },
     {
         'comida': 0,
         'cuentas y pagos': 0,
         'hogar': 0,
         'transporte': 0,
         'ropa': 0,
         'salud e higiene': 0,
         'compras': 0,
         'diversion': 0,
     })
    cambiarGastosCategoria(Object.keys(sumaGastos).map(elemento=>{
        return {categoria: elemento,valor:sumaGastos[elemento]}
    }))
},[cambiarGastosCategoria,gastos])

    return gastosPorCategoria;
}
 
export default useObtenerGastoMesCategoria;
