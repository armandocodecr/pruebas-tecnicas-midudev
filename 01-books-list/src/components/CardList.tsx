import { useBookState } from "../hooks";
import { IBookInterface } from "../interfaces/IBookInterfaces";
import { LikeComponent } from "./LikeComponent";

interface Props{
    listBooks: IBookInterface
}

export function CardList({ listBooks }: Props) {

    const { onLikedBook } = useBookState()

    return(
        <div key={listBooks.book.title} className="myCard">
            <div className="innerCard">
              <div
                className={`frontSide Es${listBooks.book.title
                  .split(" ")
                  .join("")}`}
              >
                <style>
                  {`
                            .Es${listBooks.book.title.split(" ").join("")},
                            .Es${listBooks.book.title
                              .split(" ")
                              .join("")}::before {
                            background: url(${
                              listBooks.book.cover
                            }) no-repeat center;
                            background-size: cover;
                            }
                          `}
                </style>
                <p className="title">
                  {listBooks.book.title}
                  <p className="author">{listBooks.book.author.name}</p>
                </p>
              </div>
              <div
                className="backSide"
                style={{
                  backgroundImage:
                    "linear-gradient(160deg, #111111 0%, #5c5c5c 100%)",
                }}
              >
                <p className="title">{listBooks.book.synopsis}</p>
                <div 
                  style={{ width: "90%", display: "flex", justifyContent: "center", alignItems: "center", borderTop: "1px solid #c0c0c0", paddingTop: 10 }}
                >
                  <p>{ listBooks.book.pages } pages</p>
                  <LikeComponent
                    isChecked={listBooks.isFavorite!}
                    onClickFunction={() => onLikedBook(listBooks)}
                  />
                </div>
              </div>
            </div>
          </div>
    )

}