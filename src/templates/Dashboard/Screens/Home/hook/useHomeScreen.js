import { useEffect, useState } from 'react';

import { database } from '@/services/firebase';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { LogoutUser, selectUser } from '@/redux/userSlice';


export const useHomeScreen = ({ serviceData, loading }) => {
    const [tickets, setTickets] = useState()
    const [dateLott, setDateLott] = useState('')
    const [hourLott, setHourLott] = useState('')
    const { userStore } = useSelector(selectUser);
    const dispatch = useDispatch()

    const valorPremio = serviceData?.valorPremio || '0';


    function getTimeUTC(time) {
        const current = new Date();
        const dateFormat = new Date(time?.seconds * 1000);

        function converNameMonth(number) {
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

    async function loadTickets() {
        const getTicketsFromFirebase = []
        const qTickets = collection(database, "/user/1qBsXTFqzSBNyif9ilQk/tickets");
        const ticketRef = await getDocs(qTickets);

        ticketRef.forEach((doc) => {
            getTicketsFromFirebase.push({ ...doc.data() })
            setTickets(getTicketsFromFirebase)

            console.log(tickets);
        })
    }

    function logoutUserSession() {
        dispatch(LogoutUser())
        localStorage.removeItem("userKey")
    }

    useEffect(() => {
        loadTickets()
        getTimeUTC(serviceData?.dataProxSort)
    }, [serviceData?.valorPremio, userStore])

    return { userStore, serviceData, valorPremio, dateLott, hourLott, tickets, logoutUserSession }
}