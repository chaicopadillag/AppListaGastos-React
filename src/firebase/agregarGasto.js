import {db} from './firebaseConfig'

const agregarGasto=({gasto})=>{
  return  db.collection('gastos').add(gasto)
}
export default agregarGasto