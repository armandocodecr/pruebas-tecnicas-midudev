import { GenreSelector, InputRange, InputSearch } from ".";
import { LikeIcon } from "../assets/icons";
import { IBookInterface } from "../interfaces/IBookInterfaces";
import { useBooksStore } from "../store/useBooksStore";
import { useUIStore } from "../store/useUIStore";

interface Props {
  bookInfo: IBookInterface[];
}

export function ListsBooks({ bookInfo }: Props) {
  const {
    favoriteBookStores,
    setFavoriteBookStore,
    removeFavoriteBookStore,
    dislikeBook,
    likeBook,
  } = useBooksStore((state) => ({
    favoriteBookStores: state.favoriteBookStores,
    setFavoriteBookStore: state.setFavoriteBookStore,
    removeFavoriteBookStore: state.removeFavoriteBookStore,
    dislikeBook: state.dislikeBook,
    likeBook: state.likeBook,
  }));

  const { isFavoritesUI } = useUIStore((state) => ({
    isFavoritesUI: state.isFavoritesUI,
    setFavoritesUI: state.setFavoritesUI,
  }));

  const onLikedBook = (currBook: IBookInterface) => {
    const { book } = currBook;
    const findBook = favoriteBookStores.some(
      (books) => books.book.ISBN === book.ISBN
    );
    if (findBook) {
      dislikeBook(currBook.book.ISBN);
      removeFavoriteBookStore(currBook.book.ISBN);
      return;
    }
    likeBook(currBook.book.ISBN);
    setFavoriteBookStore(currBook);
  };

  return (
    <>
      <aside>
        {
          !isFavoritesUI && (
            <div>
              <InputSearch />
              <InputRange />
              <GenreSelector />
            </div>
          )
        }
      </aside>
      <section className="container-books">
        {bookInfo.map((book_data) => (
          <div key={book_data.book.title} className="myCard">
            <div className="innerCard">
              <div
                className={`frontSide Es${book_data.book.title
                  .split(" ")
                  .join("")}`}
              >
                <style>
                  {`
                            .Es${book_data.book.title.split(" ").join("")},
                            .Es${book_data.book.title
                              .split(" ")
                              .join("")}::before {
                            background: url(${
                              book_data.book.cover
                            }) no-repeat center;
                            background-size: cover;
                            }
                          `}
                </style>
                <p className="title">{book_data.book.title}</p>
              </div>
              <div
                className="backSide"
                style={{
                  backgroundImage:
                    "linear-gradient(160deg, #111111 0%, #5c5c5c 100%)",
                }}
              >
                <p className="title">{book_data.book.synopsis}</p>
                <LikeIcon
                  isChecked={book_data.isFavorite!}
                  onClickFunction={() => onLikedBook(book_data)}
                />
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}
