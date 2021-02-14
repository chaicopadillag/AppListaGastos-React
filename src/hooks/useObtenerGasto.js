import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { db } from "../firebase/firebaseConfig";

const useObtenerGasto = (id) => {
    const [gasto,cambiarGasto]=useState('')
    const history=useHistory()
    useEffect(()=>{
        db.collection('gastos')
        .doc(id)
        .get()
        .then((doc)=>{
            if(doc.exists) cambiarGasto(doc)
            else history.push('/lista')
        })
    },[history,id])
    return [gasto]
}
 
export default useObtenerGasto;