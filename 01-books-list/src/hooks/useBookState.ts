import { useEffect } from "react";
import { IBookInterface } from "../interfaces/IBookInterfaces";
import { useBooksStore } from "../store/useBooksStore";
import { useInputState } from ".";


export function useBookState() {
    
    const {
        books, 
        favoriteBookStores, removeFavoriteBookStore,
        dislikeBook,likeBook,gendersBooks,
        setGendersBooks,setFilterBooksByGender, setFilterBooksByNumberPages,
        setFilterBooksByNameBook, setFavoriteBookStore,
      } = useBooksStore((state) => ({
        books                      : state.bookStore,
        favoriteBookStores         : state.favoriteBookStores,
        setFavoriteBookStore       : state.setFavoriteBookStore,
        removeFavoriteBookStore    : state.removeFavoriteBookStore,
        dislikeBook                : state.dislikeBook,
        likeBook                   : state.likeBook,
        gendersBooks               : state.gendersBooks,
        setGendersBooks            : state.setGendersBooks,
        setFilterBooksByGender     : state.setFilterBooksByGender,
        setFilterBooksByNumberPages: state.setFilterBooksByNumberPages,
        setFilterBooksByNameBook    : state.setFilterBooksByNameBook
      }));

      const { selectGenereValue, inputTextStore } = useInputState()
      const { inputRangeStore } = useInputState()

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
        setGendersBooks()
      }, [])

      useEffect(() => {
        setFilterBooksByGender(selectGenereValue)
      }, [selectGenereValue])

      useEffect(() => {
        setFilterBooksByNumberPages(inputRangeStore)
      }, [inputRangeStore])

      useEffect(() => {
        setFilterBooksByNameBook(inputTextStore)
    }, [inputTextStore])

      return{
        //Variables
        gendersBooks,
        books,
        favoriteBookStores,

        //Methods
        onLikedBook,
      }

}