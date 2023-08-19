import { ChangeEvent, useEffect } from "react";
import { useInputStore } from "../store/useInputStore";
import { useBooksStore } from "../store/useBooksStore";

export function GenreSelector() {

  const { selectGenereValue, setSelectGenereStore } = useInputStore(state => ({
    selectGenereValue   : state.selectGenereValue,
    setSelectGenereStore: state.setSelectGenereStore
  }))

  const { gendersBooks, setGendersBooks, setFilterBooksByGender } = useBooksStore(state => ({
    gendersBooks          : state.gendersBooks,
    setGendersBooks       : state.setGendersBooks,
    setFilterBooksByGender: state.setFilterBooksByGender
  }))

  const handleSelectChange = ( e: ChangeEvent<HTMLSelectElement> ) => {
    setSelectGenereStore(e.target.value)
  }

  useEffect(() => {
    setGendersBooks()
  }, [])
  useEffect(() => {
    setFilterBooksByGender(selectGenereValue)
  }, [selectGenereValue])
  

  return (
    <select
      id="genders"
      onChange={handleSelectChange}
      value={selectGenereValue}
    >
      <option  selected>
        Enter a category
      </option>
      {gendersBooks &&
        gendersBooks.map((gender) => (
          <option
            value={gender}
            key={gender}
          >
            {gender}
          </option>
        ))}
    </select>
  );
}
