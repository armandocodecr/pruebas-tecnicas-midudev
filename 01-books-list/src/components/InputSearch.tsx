import { useInputState } from "../hooks";

export function InputSearch() {

    const { inputTextStore, handleInputValue } = useInputState()    

    return(
        <input 
            autoComplete="off"
            type="text" 
            name="text"
            data-testid="inputSearch"
            value={inputTextStore} 
            className="inputSearch" 
            placeholder="Search a book" 
            onChange={handleInputValue}
        />
    )

}