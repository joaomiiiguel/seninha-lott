import { createSlice } from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'user',
    initialState: {
        userStore: {},
        isLogged: false,
    },
    reducers:{
        changeUser(state, {payload}){
            return {...state, isLogged: true, userStore: payload}
        },
        LogoutUser(state){
            return {...state, isLogged: false, userStore: {}}
        }
    }
})


export const { changeUser, LogoutUser} = slice.actions

export const selectUser = state => state.user

export default slice.reducer