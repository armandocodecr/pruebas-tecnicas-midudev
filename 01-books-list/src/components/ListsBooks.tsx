import { useEffect } from "react";
import { GenreSelector, InputRange, InputSearch } from ".";
import { useUIState } from "../hooks/useUIState";
import { IBookInterface } from "../interfaces/IBookInterfaces";
import { CardList } from "./";
import AOS from 'aos';
import 'aos/dist/aos.css'

interface Props {
  bookInfo: IBookInterface[];
}

export function ListsBooks({ bookInfo }: Props) {

  const { isFavoritesUI } = useUIState()

  useEffect(() => {
    AOS.init()
  }, [])

  return (
    <>
        {
          !isFavoritesUI && (
            <aside data-aos="fade-right">
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
          <CardList key={book_data.book.ISBN} listBooks={book_data} data_aos_animation="zoom-in-up" />
        ))}
      </section>
    </>
  );
}
