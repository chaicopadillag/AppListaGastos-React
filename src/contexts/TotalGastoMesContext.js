import React, { useContext, useEffect, useState } from 'react';
import useGastoMes from '../hooks/useGastosMes';

const TotalGastoMesContext = React.createContext()
const useTotalMes=()=>useContext(TotalGastoMesContext)

const TotalGastoMesProvider=({children})=>{
    const [total,cambiarTotal]=useState(0)
    const gastosMes=useGastoMes()
    useEffect(()=>{
        let gastoSumado=0;
        gastosMes.forEach(gasto=>{
            gastoSumado+=parseFloat(gasto.valor)
        })
        cambiarTotal(gastoSumado)
    },[gastosMes])
    return (
        <TotalGastoMesContext.Provider value={{total:total}}>
            {children}
        </TotalGastoMesContext.Provider>
    )
}
export  {TotalGastoMesProvider,useTotalMes}