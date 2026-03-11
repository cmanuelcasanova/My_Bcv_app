import { create } from 'zustand';

interface AppState {
  Option: string;
  Dolar: number;
  Euro: number;
  setDolar: (valor: number) => void;
  setEuro: (valor:number) => void;
  setOption: (nuevoOption: string) => void;
}

export const useStore = create<AppState>((set) => ({
    Option: '1',
    Dolar: 0, 
    Euro: 0, 
    setOption: (nuevoOption) => set({ Option: nuevoOption }),
    setDolar: (valor) => set({ Dolar: valor }),
    setEuro: (valor) => set({ Euro: valor }),
}));