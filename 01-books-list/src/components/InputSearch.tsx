import { useEffect } from "react";
import { useInputStore } from "../store/useInputStore"
import { useBooksStore } from "../store/useBooksStore";


export function InputSearch() {

    const { inputTextStore, setInputTextStore } = useInputStore((state) => ({
        inputTextStore    : state.inputTextStore,
        setInputTextStore : state.setInputTextStore
    }))

    const { setFilterBooksByNameBook } = useBooksStore((state) => 
    ({
        setFilterBooksByNameBook: state.setFilterBooksByNameBook,
   }));

    const handleInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setInputTextStore(newValue);
    };

    useEffect(() => {
        setFilterBooksByNameBook(inputTextStore)
    }, [inputTextStore])
    

    return(
        <input 
            autoComplete="off"
            type="text" 
            name="text"
            value={inputTextStore} 
            className="inputSearch" 
            placeholder="Search a book" 
            onChange={handleInputValue}
        />
    )

}