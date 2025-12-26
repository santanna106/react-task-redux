// store/slices/uiSlice.js
import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        tema: 'claro',
        mostrarConcluidas: true,
        ordenacao: 'data' // 'data' || 'nome', 'categoria'
    },
    reducers: {
        alternarTema: (state) => {
            state.tema = state.tema === 'claro' ? 'escuro' : 'claro';
        },
        toggleMostrarConcluidas: (state) => {
            state.mostrarConcluidas = !state.mostrarConcluidas;
        },
        setOrdenacao: (state, action) => {
            state.ordenacao = action.payload;
        }
    }
});

export const {
    alternarTema,
    toggleMostrarConcluidas,
    setOrdenacao
} = uiSlice.actions;

export default uiSlice.reducer;