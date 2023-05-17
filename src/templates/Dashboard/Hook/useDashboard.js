import { useState, useEffect } from "react";
import { database } from '@/services/firebase';
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";
import { selectUser } from '@/redux/userSlice';

export const useDashboard = () => {
    const [userData, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [serviceData, setServiceData] = useState()
    const { userStore } = useSelector(selectUser);

    async function loadDataFirebase() {
        const q = query(collection(database, "user"), where("uid", "==", userStore.uid ? userStore.uid : ''));
        const qService = collection(database, "DataService")

        const userRef = await getDocs(q);
        const serviceRef = await getDocs(qService);

        userRef.forEach((doc) => {
            setUser(doc.data())
            setLoading(false)
            console.log(userData);
        });
        serviceRef.forEach((doc) => {
            setServiceData(doc.data())
            setLoading(false)
            console.log(serviceData);
        });
    }

    useEffect(() => {
        loadDataFirebase()
    }, [])

    return { userData, serviceData, loading }
}