import { useGlobalContext } from '../context';
import '../style/Meals.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
const Meals = () => {
    const {loading, meals, selectMeal, addToFavorites } = useGlobalContext();
    if (loading) {
        <div className="section">
            <h1>Loading...</h1>
        </div>
    }

    if (meals.length < 1) {
        return (
            <section className="section">
                <h4>No meals matched your search term. Please try again.</h4>
            </section>
        )
    }
    return (
        <section className='section-center'>
            {meals.map((singleMeal) => {
                const {idMeal, strMeal: title, strMealThumb: image} = singleMeal
                
                return (
                    <article key={idMeal} className='single-meal'>
                        <img src={image} alt={title} className="img" onClick={() => selectMeal(idMeal)} title={title} />
                        <footer>
                            <h5>{title}</h5>
                            <button className="bi bi-hand-thumbs-up" onClick={() => addToFavorites(idMeal)} title='Add to favorite'></button>
                        </footer>
                    </article>
                )
            })}
        </section>
    )
}
export default Meals;