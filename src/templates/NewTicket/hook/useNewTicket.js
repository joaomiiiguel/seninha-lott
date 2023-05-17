import { useEffect, useState } from "react"
import { collection, addDoc } from "firebase/firestore";
import { database } from "@/services/firebase";
import { useRouter } from 'next/router';


export const useNewTicket = () => {
    const [loading, setLoading] = useState(false)
    const [modalAlert, setModalAlert] = useState(0)
    const [modalPayment, setModalPayment] = useState(false)
    const [newTicket, setNewTicket] = useState([])
    const [listNumber, setListNumber] = useState()
    const router = useRouter();


    function ListNumbers() {
        var numbersList = []
        for (let i = 1; i <= 60; i++) {
            numbersList.push(i);
        }
        setListNumber(numbersList)
    }

    function selectNumber(number) {
        const index = newTicket.indexOf(number);

        if (index !== -1) {
            newTicket.splice(index, 1)
            setNewTicket(newTicket => ([...newTicket]))
        }
        else if (newTicket.length <= 9) {
            setNewTicket(newTicket => ([...newTicket, number]))
        }
        else {
            setModalAlert(2)
            
        }
    }

    async function createNewTicket(ticketList) {
        setLoading(true)

        const dataTicket = {
            statusPayment: false,
            createdAt: Date.now(),
            listNumbs: ticketList.sort(function (a, b) { return a - b })
        }
        const newRef = await addDoc(collection(database, "/user/1qBsXTFqzSBNyif9ilQk/tickets"), dataTicket)
        .then((response) => {
                console.log('Nova aposta');
                setTimeout(() => {
                    router.push('/')
                }, 1000);
            })
            .catch((error) => {
                setModalAlert(0)
            })
    }

    useEffect(() => {
        ListNumbers()
    }, [newTicket])


    return { loading, newTicket, listNumber, setNewTicket, setListNumber, selectNumber, createNewTicket, modalAlert, modalPayment, setModalPayment }
}