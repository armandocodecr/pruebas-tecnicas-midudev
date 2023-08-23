import { useEffect, useMemo } from "react";
import { IBookInterface } from "../interfaces/IBookInterfaces";
import { useBooksStore } from "../store/useBooksStore";
import { useInputState } from ".";

export function useBookState() {
    
    const {
        books, 
        favoriteBookStores, removeFavoriteBookStore,
        dislikeBook,likeBook,gendersBooks,
        setFilterBooksByNumberPages,
        setFilterBooksByNameBook, setFavoriteBookStore,
      } = useBooksStore((state) => ({
        books                      : state.bookStore,
        favoriteBookStores         : state.favoriteBookStores,
        setFavoriteBookStore       : state.setFavoriteBookStore,
        removeFavoriteBookStore    : state.removeFavoriteBookStore,
        dislikeBook                : state.dislikeBook,
        likeBook                   : state.likeBook,
        gendersBooks               : state.gendersBooks,
        setFilterBooksByNumberPages: state.setFilterBooksByNumberPages,
        setFilterBooksByNameBook   : state.setFilterBooksByNameBook,
        setBookStore             : state.setBookStore
      }));

      
      const { selectGenreValue, inputTextStore } = useInputState()
      const { inputRangeStore } = useInputState()

      const filteredBooks = useMemo(() => {
        const booksFilter = selectGenreValue
          ? books.filter((book) => book.book.genre.toLowerCase().startsWith(selectGenreValue.toLowerCase()))
          : books;
        if( booksFilter.length === 0 ) return books
        return booksFilter
      }, [books, selectGenreValue]);

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

      useEffect(() => {
        setFilterBooksByNumberPages(inputRangeStore)
      }, [inputRangeStore])

      useEffect(() => {
        setFilterBooksByNameBook(inputTextStore)
    }, [inputTextStore])

      return{
        //Variables
        gendersBooks,
        books: filteredBooks,
        favoriteBookStores,

        //Methods
        onLikedBook,
      }

}