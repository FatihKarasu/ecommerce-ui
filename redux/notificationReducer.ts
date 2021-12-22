import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from './store'

export interface NotificationState {
    notification: string
    variant: string
}

const initialState: NotificationState[] = []



export const notificationReducer = createSlice({
    name: 'notification',
    initialState,

    reducers: {
        addNotification: (state, action: PayloadAction<NotificationState>) => {
            state.push(action.payload)
        },
        removeNotification: (state) => {
            state.shift()
        },

    },


})

export const { addNotification, removeNotification } = notificationReducer.actions

export const getNotifications = (state: AppState) => state.notification



export default notificationReducer.reducer
