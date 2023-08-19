import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IBookInterface } from '../interfaces/IBookInterfaces'
import dataBooks from '../mook/books.json'

interface IBooks{
    gendersBooks                 : string[]
    bookStore                       : IBookInterface[],
    favoriteBookStores              : IBookInterface[],
    setBookStore                    : (newState : IBookInterface[]) => void,
    setGendersBooks                 : () => void,
    setFavoriteBookStore            : (newState : IBookInterface) => void,
    removeFavoriteBookStore         : (id : string) => void,
    likeBook                        : (id : string) => void,
    dislikeBook                     : (id : string) => void,
    setFilterBooksByNumberPages     : (numberPages : number) => void,
    setFilterBooksByNameBook        : (bookName : string) => void,
    setFilterBooksByGender          : (genre : string) => void,
}

export const useBooksStore = create<IBooks>()(
persist(
    set => ({
        bookStore: dataBooks,
        favoriteBookStores: [],
        gendersBooks: [],
        setBookStore: ( newState : IBookInterface[]) => set(() => ({
            bookStore: newState
        })),
        setGendersBooks: () => set((state) => {
            const { bookStore } = state
            const setNoDuplicates = new Set(bookStore.map(books => books.book.genre));
            const arrayNoDuplicates = [...setNoDuplicates];
            return {
                gendersBooks: arrayNoDuplicates
            }
        }),
        setFavoriteBookStore: ( newState : IBookInterface) => set(state => {
            const newArray: IBookInterface[] = [ ...state.favoriteBookStores, newState ]
            return {
                favoriteBookStores: newArray
            }
        }),
        removeFavoriteBookStore: ( id : string) => set(state => {
            const newArray: IBookInterface[] = state.favoriteBookStores.filter(books => books.book.ISBN !== id)
            return {
                favoriteBookStores: newArray
            }
        }),

        likeBook: ( id : string) => set(state => {
            const newArray: IBookInterface[] = state.bookStore.map(books => {
                if(books.book.ISBN === id) books.isFavorite = true
                return books
            })
            return {
                bookStore: newArray
            }
        }),

        dislikeBook: ( id : string) => set(state => {
            const newArray: IBookInterface[] = state.bookStore.map(books => {
                if(books.book.ISBN === id) books.isFavorite = false
                return books
            })
            return {
                bookStore: newArray
            }
        }),
        setFilterBooksByNumberPages: ( numberPages : number) => set(() => {
            const allBooks: IBookInterface[] = dataBooks
            const newArray: IBookInterface[] = allBooks.filter(books => books.book.pages <= numberPages)
            return {
                bookStore         : newArray,
            }
        }),
        setFilterBooksByNameBook: ( bookName : string) => set(() => {
            const allBooks: IBookInterface[] = dataBooks
            bookName = bookName.toLowerCase()
            const newArray: IBookInterface[] = allBooks.filter(books => books.book.title.toLocaleLowerCase().startsWith(bookName))
            return {
                bookStore: newArray
            }
        }),
        setFilterBooksByGender: ( genre : string) => set(() => {
            const allBooks: IBookInterface[] = dataBooks
            genre = genre.toLowerCase()
            const newArray: IBookInterface[] = allBooks.filter(books => books.book.genre.toLocaleLowerCase().startsWith(genre))
            return {
                bookStore: newArray.length !== 0 ? newArray : dataBooks
            }
        }),
    }),
    {
        name: "currentListBooks",
    }
))