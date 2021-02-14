import {db} from './firebaseConfig'

const updateGasto=({id,gasto})=>{
  return  db.collection('gastos').doc(id).update(gasto)
}
export default updateGasto