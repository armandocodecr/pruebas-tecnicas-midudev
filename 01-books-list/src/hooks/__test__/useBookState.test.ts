import { test } from "vitest";
import { renderHook } from "@testing-library/react-hooks";
import { useMemo } from "react";
import dataBooks from "../../mook/books.json";
import { IBookInterface } from "../../interfaces/IBookInterfaces";
import { parseDataBooks } from "../../utils/parseDataBooks";
import { mookDataLocalStorage, mookDefaultData } from "./mook/mookDataBooks";

describe("Test of filteredBooks and parseBooks", () => {
  test("it should parse books based on local storage data", () => {
    const { state } = mookDataLocalStorage
    const dataBooks: IBookInterface[] = parseDataBooks(mookDefaultData, state.favoriteBookStores)
    const dataBooksWithoutFavoriteBooks = parseDataBooks(mookDefaultData)

    expect(dataBooksWithoutFavoriteBooks).toEqual(mookDefaultData)
   //👆 Verifies that if we do not pass it a persistent state of the favorite books, it will return the original data.
    expect(dataBooks).toEqual([
        {
          book: {
            title: "El Señor de los Anillos",
            pages: 1200,
            genre: "Fantasía",
            cover:
              "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1566425108i/33.jpg",
            synopsis:
              "Una aventura épica en un mundo de fantasía llamado la Tierra Media.",
            year: 1954,
            ISBN: "978-0618640157",
            author: {
              name: "J.R.R. Tolkien",
              otherBooks: ["El Hobbit", "El Silmarillion"],
            },
          },
          isFavorite: true
        },
        {
          book: {
            title: "Juego de Tronos",
            pages: 694,
            genre: "Fantasía",
            cover:
              "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1273763400i/8189620.jpg",
            synopsis:
              "En un reino donde las estaciones duran años, una batalla épica por el trono se desarrolla.",
            year: 1996,
            ISBN: "978-0553103540",
            author: {
              name: "George R. R. Martin",
              otherBooks: [
                "Choque de Reyes",
                "Tormenta de Espadas",
                "Festín de Cuervos",
              ],
            },
          },
          isFavorite: false
        },
      ])
  });

  test("should return the filter books correctly", () => {
    const selectGenreValue = "Zombies";
    const books = parseDataBooks(dataBooks);
    const { result } = renderHook(() =>
      useMemo(() => {
        const booksFilter = selectGenreValue
          ? books.filter((book) =>
              book.book.genre
                .toLowerCase()
                .startsWith(selectGenreValue.toLowerCase())
            )
          : books;
        if (booksFilter.length === 0) return books;
        return booksFilter;
      }, [books, selectGenreValue])
    );

    expect(result.current).toMatchSnapshot([
      {
        book: {
          title: "Apocalipsis Zombie",
          pages: 444,
          genre: "Zombies",
          cover:
            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1422626176i/24762432.jpg",
          synopsis:
            "Un gallego se queda en casa en pleno apocalipsis zombie y acaba casi salvando el mundo",
          year: 2001,
          ISBN: "978-4444532611",
          author: {
            name: "Manel Loreiro",
            otherBooks: [],
          },
        },
      },
    ]);
  });
});
