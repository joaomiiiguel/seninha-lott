import { useState, useEffect } from "react";
import { database } from '@/services/firebase';
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

export const useDataService = () => {
    const [serviceData, setServiceData] = useState(null)

    async function loadDataFirebase() {
        const qService = collection(database, "DataService")

        const serviceRef = await getDocs(qService);

        serviceRef.forEach((doc) => {
            setServiceData(doc.data())
        });
    }

    useEffect(() => {
        loadDataFirebase()
    }, [])

    return { serviceData }
}