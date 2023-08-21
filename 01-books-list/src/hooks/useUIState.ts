import { useUIStore } from "../store/useUIStore";


export function useUIState() {

    const { isFavoritesUI, setFavoritesUI } = useUIStore((state) => ({
        isFavoritesUI: state.isFavoritesUI,
        setFavoritesUI: state.setFavoritesUI,
    }));

    const handleUI = () => {
        setFavoritesUI(!isFavoritesUI);
    };

    return {
        //Variables
        isFavoritesUI,

        //Methods
        handleUI,
    }

}