import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

import type { AppState, AppThunk } from './store'

export interface Notification {
    notification: string
    variant: string
    lifeSpan:number
}
export interface NotificationState {
    id:string
    notification: string
    variant: string
    lifeSpan:number
    createdAt:number
    isHidden:boolean
}
const initialState: NotificationState[] = []

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}


export const notificationReducer = createSlice({
    name: 'notification',
    initialState,

    reducers: {
        addNotification: (state, action: PayloadAction<Notification>) => {
            let newState:NotificationState={...action.payload,createdAt:Date.now(),id:guidGenerator(),isHidden:false}
            state.push(newState)
        },
        hideNotification:(state,action:PayloadAction<string>)=>{
            state.forEach((s) => {
                if(s.id==action.payload)
                {
                    s.isHidden=true
                    return
                }
            });
        },
        removeNotification: (state,action:PayloadAction<string>) => {
            state.forEach((s,index) => {
                if(s.id==action.payload)
                {
                    state.splice(index,1)
                    return
                }
            });
        },

    },


})

export const { addNotification, removeNotification,hideNotification } = notificationReducer.actions

export const getNotifications = (state: AppState) => state.notification



export default notificationReducer.reducer
