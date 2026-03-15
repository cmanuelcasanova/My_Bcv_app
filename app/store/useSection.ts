import { create } from 'zustand';

interface AppState {
  Option: boolean;
  Dolar: number;
  Euro: number;
  BinanceBuy: number;
  BinanceSell: number;
  inputDivisa: string;
  checkBinance:boolean;
  OptionConvertion:string;
  setDolar: (valor: number) => void;
  setEuro: (valor:number) => void;
  setOption: () => void;
  setOptionConvertion: (nuevoOption: string) => void;
  setBinanceBuy: (valor: number) => void;
  setBinanceSell: (valor: number) => void;
  setinputDivisa: (valor: string) => void;
  setcheckBinance: () => void;
}

export const useStore = create<AppState>((set) => ({
    Option: true,
    Dolar: 0, 
    Euro: 0, 
    BinanceBuy:0,
    BinanceSell:0,
    inputDivisa:"",
    checkBinance:false,
    OptionConvertion:'1',
    setOption: () => set( (state)=> ({Option:!state.Option})),
    setOptionConvertion: (nuevoOption) => set({ OptionConvertion: nuevoOption }),
    setDolar: (valor) => set({ Dolar: valor }),
    setEuro: (valor) => set({ Euro: valor }),
    setBinanceBuy: (valor) => set({ BinanceBuy: valor }),
    setBinanceSell: (valor) => set({ BinanceSell: valor }),
    setinputDivisa: (valor) => set({ inputDivisa: valor }),
    setcheckBinance: () => set( (state)=> ({checkBinance:!state.checkBinance})),
}));