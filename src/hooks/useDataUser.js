import { useState, useEffect } from "react";
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { database } from '@/services/firebase';
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";


export const useDataUser = () => {
    const { userStore } = useSelector(selectUser);
    const [userData, setUserData] = useState()

    async function loadUserDataFirebase() {
        const q = query(collection(database, "user"), where("uid", "==", userStore.uid ? userStore.uid : ''));

        const userRef = await getDocs(q);

        userRef.forEach((doc) => {
            setUserData(doc.data())
        });
    }

    useEffect(() => {
        loadUserDataFirebase()
    }, [])

    return { userData }
}