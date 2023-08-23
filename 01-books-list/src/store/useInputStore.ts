import { create } from 'zustand'

interface IInputs{
    inputRangeStore         : number,
    inputTextStore          : string,
    selectGenreValue       : string,
    setInputRangeStore      : (newState : number) => void,
    setInputTextStore       : (newState : string) => void,
    setSelectGenreStore    : (newState : string) => void,
}

export const useInputStore = create<IInputs>(set => 
({
    inputRangeStore: 1200,
    inputTextStore: '',
    selectGenreValue: 'Select a genre',
    setInputRangeStore: ( newState : number) => set(() => ({
        inputRangeStore: newState
    })),
    setInputTextStore: ( newState : string) => set(() => ({
        inputTextStore: newState
    })),
    setSelectGenreStore: ( newState : string) => set(() => ({
        selectGenreValue: newState
    })),
}))