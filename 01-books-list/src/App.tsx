import { useBooksStore } from "./store/useBooksStore";
import { ListsBooks } from "./components";
import { useUIStore } from "./store/useUIStore"
import './index.css'
import "./Responsive.css";

function App() {

  const { books, favoriteBookStores } = useBooksStore((state) => ({
    books             : state.bookStore,
    favoriteBookStores: state.favoriteBookStores,
  }));

  const { isFavoritesUI, setFavoritesUI } = useUIStore((state) => ({
    isFavoritesUI : state.isFavoritesUI,
    setFavoritesUI: state.setFavoritesUI
  }))

  const title = !isFavoritesUI ? "LISTS BOOKS APP" : "MY FAVORITES BOOKS"
  const textButton = !isFavoritesUI ? "My favorites ❤️" : "Back to home"
  const handleUI = () => {
    setFavoritesUI(!isFavoritesUI);
  };
  
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
