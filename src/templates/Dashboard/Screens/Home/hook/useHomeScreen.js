
import { useEffect, useState } from 'react';
import { database } from '@/services/firebase';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from '@/redux/userSlice';


export const useHomeScreen = () => {
    const [userData, setUser] = useState()
    const [serviceData, setServiceData] = useState()
    const [tickets, setTickets] = useState()
    const [loading, setLoading] = useState(true)
    const [dateLott, setDateLott] = useState('')
    const [hourLott, setHourLott] = useState('')
    const { userStore } = useSelector(selectUser);
    
    const valorPremio = serviceData?.valorPremio || '0000';


    function getTimeUTC(time) {
        const current = new Date();
        const dateFormat = new Date(time?.seconds * 1000);

        function converNameMonth(number){
            switch (number) {
                case 1:
                    return 'janeiro'
                    break;
            
                case 2:
                    return 'fevereiro'
                    break;
            
                case 3:
                    return 'março'
                    break;
            
                case 4:
                    return 'abril'
                    break;
            
                case 5:
                    return 'maio'
                    break;
            
                default:
                    break;
            }
        }

        const convertDateCurrent = `${current.getDate()} de ${converNameMonth(current.getMonth())}`;
        const convertDateLottery = `${dateFormat.getDate()} de ${converNameMonth(dateFormat.getMonth())}`;
        
        if (convertDateCurrent === convertDateLottery) {
            setDateLott('Hoje')
        } else {
            setDateLott(convertDateLottery)
        }
        setHourLott(`${dateFormat.getHours()}:${Intl.NumberFormat("pt-BR", { minimumIntegerDigits: 2 }).format(dateFormat.getMinutes())}`)
    }


    async function loadDataFirebase() {
        const getTicketsFromFirebase = []
        const q = query(collection(database, "user"), where("uid", "==", userStore.uid ? userStore.uid : ''));
        const qTickets = collection(database, "/user/1qBsXTFqzSBNyif9ilQk/tickets");
        const qService = collection(database, "DataService")
        const userRef = await getDocs(q);
        const ticketRef = await getDocs(qTickets);
        const serviceRef = await getDocs(qService);


        userRef.forEach((doc) => {
            setUser(doc.data())
            setLoading(false)
        });
        serviceRef.forEach((doc) => {
            setServiceData(doc.data())
            setLoading(false)
        });
        ticketRef.forEach((doc) => {
            getTicketsFromFirebase.push({...doc.data()})
            setTickets(getTicketsFromFirebase)
            setLoading(false)
        })
    }

    useEffect(() => {
        loadDataFirebase()
        getTimeUTC(serviceData?.dataProxSort)
    }, [serviceData?.valorPremio])

    return { userData, loading, userStore, serviceData, valorPremio, dateLott, hourLott, tickets }
}