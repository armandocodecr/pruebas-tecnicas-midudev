import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { IBookInterface } from '../interfaces/IBookInterfaces'
import dataBooks from '../mook/books.json'
import { parseDataBooks } from '../utils/parseDataBooks'

interface IBooks{
    gendersBooks                    : string[]
    bookStore                       : IBookInterface[],
    favoriteBookStores              : IBookInterface[],
    setBookStore                    : (newState : IBookInterface[]) => void,
    setFavoriteBookStore            : (newState : IBookInterface) => void,
    removeFavoriteBookStore         : (id : string) => void,
    likeBook                        : (id : string) => void,
    dislikeBook                     : (id : string) => void,
    setFilterBooksByNumberPages     : (numberPages : number) => void,
    setFilterBooksByNameBook        : (bookName : string) => void,
}

const localStorageListBooks = localStorage.getItem('currentListBooks')
const currFavoriteListBooks: IBookInterface[] = localStorageListBooks ? JSON.parse(localStorageListBooks).state.favoriteBookStores : [];
const books = parseDataBooks(dataBooks, currFavoriteListBooks)

const getGenres = Array.from(
    new Set(books.map(currBook => currBook.book.genre))
)

export const useBooksStore = create<IBooks>()(
persist(
    set => ({
        bookStore:  books,
        favoriteBookStores: [],
        gendersBooks: getGenres,
        setBookStore: ( newState : IBookInterface[]) => set(() => ({
            bookStore: newState
        })),
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
            const allBooks: IBookInterface[] = books
            const newArray: IBookInterface[] = allBooks.filter(books => books.book.pages <= numberPages)
            return {
                bookStore         : newArray,
            }
        }),
        setFilterBooksByNameBook: ( bookName : string) => set(() => {
            const allBooks: IBookInterface[] = books
            bookName = bookName.toLowerCase()
            const newArray: IBookInterface[] = allBooks.filter(books => books.book.title.toLowerCase().startsWith(bookName))
            return {
                bookStore: newArray
            }
        })
    }),
    {
        name: "currentListBooks",
    }
))