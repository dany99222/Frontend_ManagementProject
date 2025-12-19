import { useLocation } from "react-router-dom"


export default function EditTaskData() {

    //Para leer el queryString
const location = useLocation()
//extraer
const queryParams = new URLSearchParams(location.search)
//obtenemos editTask
const editTaskId = queryParams.get('editTask')

console.log(editTaskId)

  return (
    <div>EditTaskData</div>
  )
}
