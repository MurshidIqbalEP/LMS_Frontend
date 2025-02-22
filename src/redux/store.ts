import {configureStore} from '@reduxjs/toolkit'
import authSlice from './slices/authSlice'
import educatorSlice from './slices/educatorSlice'


const store=configureStore({
    reducer:{
        auth:authSlice,
        educatorSlice
    }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch