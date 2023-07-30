import {createSlice} from '@reduxjs/toolkit'

// export interface AuthState {
//   profile?: UserType
// }

const initialState = {}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: () => {
      console.log('login action')
    },
  },
})

export const authReducer = authSlice.reducer
export const authAction = authSlice.actions
// export const selectProfile = (state: RootState) => state.authReducer.profile
