import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    logged: false,
    dataUser: {},
    token:"",
}

export const userSlice = createSlice({
    name:'user',
    initialState,
        reducers:{
        loggin:(state, action) => {
            state.logged = action.payload;
            console.log("este es el logged",state.logged)
        },
        addDataUser:(state, action) => {
            state.dataUser = action.payload;
            console.log("Este es el console dataUserSlice",state.dataUser)
        },
        addToken:(state, action) => {
            state.token = action.payload;
            console.log("Este es el console tokenSlice",state.token)
        }
    }
});

export const {loggin, addDataUser,addToken} = userSlice.actions;

export const selectLogged = (state) => state.user.logged;
export const selectDataUser = (state) => state.user.dataUser;
export const selectToken = (state) => state.user.token;


export default userSlice.reducer;