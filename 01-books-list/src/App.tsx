import { ListsBooks } from "./components";
import { useUIState } from "./hooks/useUIState";
import { useBookState } from "./hooks";
import './index.css'
import "./Responsive.css";

function App() {

  const { isFavoritesUI, handleUI } = useUIState()
  const { books, favoriteBookStores } = useBookState()
  const title = !isFavoritesUI ? "LISTS BOOKS APP" : "MY FAVORITES BOOKS"
  const textButton = !isFavoritesUI ? "My favorites ❤️" : "Back to home"
  
  return (
    <>
      <nav>
        <h1>{title}📚</h1>
        <button onClick={handleUI}>{textButton}</button>
      </nav>
      {
        <section className="container-section-books">
          <ListsBooks 
            bookInfo={!isFavoritesUI ? books : favoriteBookStores }
          />
        </section>
      }
    </>
  );
}

export default App;
