import { selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";

import { LoginPage } from '@/templates/Login'
import { DashboardPage } from '@/templates/Dashboard';



export default function Home() {
  const { isLogged } = useSelector(selectUser)


  return (
    <main
      className={`flex flex-col items-center justify-start `}
    >
      {isLogged ? 
        <DashboardPage/>
        :
        <LoginPage />
      }
    </main>
  )
}
