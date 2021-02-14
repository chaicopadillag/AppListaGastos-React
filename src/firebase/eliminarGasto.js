import { db } from "./firebaseConfig"

const eliminarGasto=(id)=>{
    db.collection('gastos').doc(id).delete()
}
export default eliminarGasto