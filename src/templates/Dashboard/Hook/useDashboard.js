import { useState, useEffect } from "react";
import { database } from '@/services/firebase';
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from 'next/router';
import { useSelector } from "react-redux";
import { selectUser } from "../../../redux/userSlice";
import { useDataService } from "@/hooks/useDataService";


export const useDashboard = () => {
    const router = useRouter();
    const { isLogged } = useSelector(selectUser)

    if (!isLogged) {
        router.push('/login')
    }

    return {}
}