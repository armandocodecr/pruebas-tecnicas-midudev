import { useBookState, useInputState } from "../hooks";

export function GenreSelector() {

  const { selectGenereValue, handleSelectChange } = useInputState()
  const { gendersBooks } = useBookState()

  return (
    <select
      id="genders"
      onChange={handleSelectChange}
      value={selectGenereValue}
    >
      <option selected>
        Enter a category
      </option>
      {gendersBooks &&
        gendersBooks.map((gender) => (
          <option value={gender} key={gender}>
            {gender}
          </option>
        ))}
    </select>
  );
}
