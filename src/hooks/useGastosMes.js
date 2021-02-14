import { useEffect, useState } from "react"
import { db } from "../firebase/firebaseConfig"
import { endOfMonth, getUnixTime, startOfMonth } from "date-fns"
import { useAuth } from "../contexts/AuthContext"

const useGastoMes = () => {
    const {sesion}=useAuth()
    const [gastos,cambiarGasto]= useState([])

    useEffect(()=>{

        let fechaInicial=getUnixTime(startOfMonth(new Date())),
            fechaFinal=getUnixTime(endOfMonth(new Date()));
                      
        if(sesion){
        const unsuscribe= db.collection('gastos')
        .orderBy('fecha','desc')
        .where('fecha','>=',fechaInicial)
        .where('fecha','<=',fechaFinal)
        .where('uid','==',sesion.uid)
        .onSnapshot((snapshot) => {
            cambiarGasto(
                snapshot.docs.map(gasto=>{
                    return {...gasto.data(),id:gasto.id}
                })
              )            
        })
        return unsuscribe
        }
    },[sesion])

    return gastos
}
 
export default useGastoMes