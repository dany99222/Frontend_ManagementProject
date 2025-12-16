import { useParams } from "react-router-dom"


export default function EditProjectView() {

//  Podemos leer parametros de la url    
const params = useParams()
//Accedemos al id que mandamos a la url
const projectId = params.projectId!


  return (
    <div>EditProjectView</div>
  )
}
