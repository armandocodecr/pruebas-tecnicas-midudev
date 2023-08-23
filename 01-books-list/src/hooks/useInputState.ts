import { ChangeEvent } from "react";
import { useInputStore } from "../store/useInputStore";


export function useInputState() {

    const { 
        selectGenreValue, inputRangeStore, inputTextStore,
        setInputRangeStore, setInputTextStore, setSelectGenereStore
    } = useInputStore(state => ({
        selectGenreValue   : state.selectGenreValue,
        setSelectGenereStore: state.setSelectGenreStore,
        inputRangeStore    : state.inputRangeStore,
        setInputRangeStore : state.setInputRangeStore,
        inputTextStore    : state.inputTextStore,
        setInputTextStore : state.setInputTextStore
    }))

    const handleSelectChange = ( e: ChangeEvent<HTMLSelectElement> ) => {
        setSelectGenereStore(e.target.value)
    }

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value);
        setInputRangeStore(newValue);
      };

    const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputTextStore(newValue);
    };

    return {
        //Variables
        selectGenreValue,
        inputRangeStore,
        inputTextStore,

        //Methods
        handleSelectChange,
        handleSliderChange,
        handleInputValue
    }

}