import { create } from 'zustand'

interface IInputs{
    inputRangeStore         : number,
    inputTextStore          : string,
    selectGenereValue       : string,
    setInputRangeStore      : (newState : number) => void,
    setInputTextStore       : (newState : string) => void,
    setSelectGenereStore    : (newState : string) => void,
}

export const useInputStore = create<IInputs>(set => 
({
    inputRangeStore: 1200,
    inputTextStore: '',
    selectGenereValue: 'Select a genere',
    setInputRangeStore: ( newState : number) => set(() => ({
        inputRangeStore: newState
    })),
    setInputTextStore: ( newState : string) => set(() => ({
        inputTextStore: newState
    })),
    setSelectGenereStore: ( newState : string) => set(() => ({
        selectGenereValue: newState
    })),
}))