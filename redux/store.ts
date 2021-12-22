import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from './userReducer'
import cartReducer from './cartReducer'
import notificationReducer from './notificationReducer'
export function makeStore() {
  return configureStore({
    reducer: { user: userReducer,cart:cartReducer,notification:notificationReducer},

  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export default store
