import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentUser : null,
    error : null,
    loading: false,
};

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers:{
        signInStart:(State)=>{
            State.loading = true;
        },
        signInSuccess:(State,action)=>{
            State.currentUser = action.payload;
            State.loading = false;
            State.error = null;
        },
        signInFailure : (state,action) =>{
            state.error = action.payload;
            state.loading = false;
        }
    }
});

export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;

export default userSlice.reducer;