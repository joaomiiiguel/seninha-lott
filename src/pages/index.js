import { useEffect } from "react";
import { selectUser, changeUser } from "../redux/userSlice";
import { useSelector, useDispatch } from "react-redux";

import { LoginPage } from '@/templates/Login'
import { DashboardPage } from '@/templates/Dashboard';


export default function Home() {
  const { isLogged } = useSelector(selectUser)
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("userKey")) {
      const storedArray = localStorage.getItem("userKey")
      const storedUser = JSON.parse(storedArray);
      dispatch(changeUser(storedUser))
    }
  }, [])

  return (
    <main
      className={`flex flex-col items-center justify-start `}
    >
      {isLogged ?
        <DashboardPage />
        :
        <LoginPage />
      }
    </main>
  )
}
