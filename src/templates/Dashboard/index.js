import React, { useState } from 'react'

import { BottomNav } from '@/components/BottomNav';

import HomeScreen from './Screens/Home';
import ResultScreen from './Screens/Result';
import ProfileScreen from './Screens/Profile';

import { useHomeScreen } from './Screens/Home/hook/useHomeScreen';

export const DashboardPage = () => {
    const [tabSelected, setTabSelected] = useState(0)

    return (
        <div className='flex flex-col space-y-4 justify-start items-center w-11/12 max-w-lg'>
            {tabSelected === 0 && <HomeScreen />}
            {tabSelected === 1 && <ResultScreen />}
            {tabSelected === 2 && <ProfileScreen />}
            <BottomNav tabSelected={tabSelected} setTabSelected={setTabSelected} />
        </div>
    )
}