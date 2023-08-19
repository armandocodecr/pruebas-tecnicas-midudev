import { create } from 'zustand'

interface IUI{
    isFavoritesUI    : boolean,
    setFavoritesUI   : (newState : boolean) => void,
}

export const useUIStore = create<IUI>(set => 
({
    isFavoritesUI: false,
    setFavoritesUI: ( newState : boolean) => set(() => ({
        isFavoritesUI: newState
    })),
}))