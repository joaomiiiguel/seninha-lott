import { useDataService } from "@/hooks/useDataService";
import { useEffect, useState } from "react";
import { database } from '@/services/firebase';
import { collection, query, where, getDocs, collectionGroup } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { LogoutUser } from '@/redux/userSlice';


const IDataService = {
    valorPremio: null,
    proxSorteio: null,
    TotalTicket: 0,
    TotalUser: 0,
    currentSorteio: {
        rodada: 1,
        concurso: 2342,
        numbers: [1, 2, 3, 23, 32, 43]
    }
}

export const getServerSideProps = async () => {

}

export const userAdminHook = () => {
    const [dataService, setDataService] = useState(IDataService)
    const [loadingService, setLoadingService] = useState(true)
    const dispatch = useDispatch()

    async function loadDataUserFirebase() {
        const service = []
        const qUserTotal = collection(database, "user");
        const qTicketTotal = query(collectionGroup(database, "tickets"))
        const qService = collection(database, "DataService")


        const usersRef = await getDocs(qUserTotal);
        const ticketsRef = await getDocs(qTicketTotal);
        const serviceRef = await getDocs(qService);


        serviceRef.forEach((doc) => {
            service.push(doc.data())
        })

        await setDataService({
            valorPremio: service[0].valorPremio,
            proxSorteio: service[0].dataProxSort,
            TotalTicket: ticketsRef.docs.length,
            TotalUser: usersRef.docs.length,
            currentSorteio: service[0].sorteiosList
        })
        

        setLoadingService(false)
    }

    function logoutUserSession() {
        dispatch(LogoutUser())
        localStorage.removeItem("userKey")
    }

    useEffect(() => {
        loadDataUserFirebase()
        console.log(dataService);
    }, [])


    return { dataService, loadingService, logoutUserSession }
}
