import React, { useState } from 'react'

import { BottomNav } from '@/components/BottomNav';

import HomeScreen from './Screens/Home';
import ResultScreen from './Screens/Result';
import ProfileScreen from './Screens/Profile';
import { useDashboard } from './Hook/useDashboard';


export const DashboardPage = () => {
    const [tabSelected, setTabSelected] = useState(0)
    const {userData, serviceData, loading} = useDashboard()
    return (
        <div className='flex flex-col space-y-4 justify-start items-center w-11/12 max-w-lg'>
            {tabSelected === 0 && <HomeScreen userData={userData} serviceData={serviceData} loading={loading} />}
            {tabSelected === 1 && <ResultScreen />}
            {tabSelected === 2 && <ProfileScreen />}
            <BottomNav tabSelected={tabSelected} setTabSelected={setTabSelected} />
        </div>
    )
}