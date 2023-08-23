import { useBookState, useInputState } from "../hooks";

export function GenreSelector() {

  const { selectGenreValue, handleSelectChange } = useInputState()
  const { gendersBooks } = useBookState()

  return (
    <select
      id="genders"
      onChange={handleSelectChange}
      value={selectGenreValue}
    >
      <option selected>
        Enter a category
      </option>
      {gendersBooks &&
        gendersBooks.map((genre) => (
          <option value={genre} key={genre}>
            {genre}
          </option>
        ))}
    </select>
  );
}
