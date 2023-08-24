import { IBookInterface } from "../interfaces/IBookInterfaces";

export function parseDataBooks(data: IBookInterface[], localStorageData?: IBookInterface[]): Array<IBookInterface> {
    return data.map((books) => {
      const { book } = books;
      if (!localStorageData) return books;
  
      return {
        book: { ...book },
        isFavorite: localStorageData
          ? localStorageData.some((currBook) => currBook.book.ISBN === books.book.ISBN)
          : false,
      };
    });
  }