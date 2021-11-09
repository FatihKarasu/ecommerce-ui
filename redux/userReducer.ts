import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from './store'

export interface UserState {
    id: string
    token: string
}

const initialState: UserState = {
    id: "",
    token: "",
}



export const userReducer = createSlice({
    name: 'user',
    initialState,

    reducers: {
        login: (state, action: PayloadAction<UserState>) => {
            state.id = action.payload.id;
            state.token = action.payload.token
        },
        logout: (state) => {
            state.id = "";
            state.token = "";
        },

    },


})

export const { login, logout } = userReducer.actions

export const getUser = (state: AppState) => state.user



export default userReducer.reducer
