import ProfileForm from "@/components/profile/ProfileForm"
import { useAuth } from "@/hooks/UseAuth"


export default function ProfailView() {

  const{data, isLoading} = useAuth()

  if(isLoading) return 'Cargando...'
if(data) return <ProfileForm data={data} />
}
