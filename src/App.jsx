import { useGlobalContext } from './context';
import Meals from './component/Meals';
import Search from './component/Search';
import Favorites from './component/Favorites';
import Modals from './component/Modals'
function App () {
  const { showModal, favorites } = useGlobalContext()
  
  return (
    <main>
      <Search />
      {favorites.length > 0 && <Favorites /> }
      <Meals />
      {showModal && <Modals />}
    </main>
    )
}

export default App
