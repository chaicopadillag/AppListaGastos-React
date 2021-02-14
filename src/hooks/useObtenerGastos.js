import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { db} from './../firebase/firebaseConfig'

const useObtnerGastos = () => {
    const {sesion}=useAuth()
    const [gastos,cambiarGastos]=useState([]);
    const [ultimoGasto,cambiarUltimoGasto]=useState(null)
    const [checkMasCargar,cambiarCheckMasCargar]=useState(false)

    const cargarMasGastos=()=>{
        db.collection('gastos')
        .where('uid','==',sesion.uid)
        .orderBy('fecha','desc')
        .limit(10)
        .startAfter(ultimoGasto)
        .onSnapshot((snapshot)=>{
            if(snapshot.docs.length>0){
              cambiarUltimoGasto(snapshot.docs[snapshot.docs.length-1]) 
              cambiarGastos(gastos.concat(snapshot.docs.map(gasto=>{
                  return {...gasto.data(),id:gasto.id}
              }))) 
            }else{
                cambiarCheckMasCargar(false)
            }
        })
    }
    useEffect(()=>{
        const unsuscribe=  db.collection('gastos')
        .where('uid','==',sesion.uid)
        .orderBy('fecha','desc')
        .limit(10)
        .onSnapshot((snapshot)=>{
            if(snapshot.docs.length>0){
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length-1])
                cambiarCheckMasCargar(true)
            }else{         
                cambiarCheckMasCargar(false)       
            }
            cambiarGastos(
                snapshot.docs.map(gasto=>{
                    return {...gasto.data(),id:gasto.id}
                })
            )
        })
        return unsuscribe;
    },[sesion])

    return [gastos,cargarMasGastos,checkMasCargar];
}
 
export default useObtnerGastos;