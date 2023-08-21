import { GenreSelector, InputRange, InputSearch } from ".";
import { useUIState } from "../hooks/useUIState";
import { IBookInterface } from "../interfaces/IBookInterfaces";
import { CardList } from "./";

interface Props {
  bookInfo: IBookInterface[];
}

export function ListsBooks({ bookInfo }: Props) {

  const { isFavoritesUI } = useUIState()

  return (
    <>
        {
          !isFavoritesUI && (
            <aside>
              <div>
                <InputSearch />
                <InputRange />
                <GenreSelector />
              </div>
            </aside>
          )
        }
      <section className="container-books">
        {bookInfo.map((book_data) => (
          <CardList key={book_data.book.ISBN} listBooks={book_data} />
        ))}
      </section>
    </>
  );
}
