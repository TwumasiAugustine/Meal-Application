import { useGlobalContext } from "../context";
import '../style/Modal.css'
const Modals = () => {
    const { selectedMeal, closeModal } = useGlobalContext()
    
    const {strMealThumb: image, strMeal: title, strInstructions: text, strSource: source} = selectedMeal
    return (
        <aside className="modal-overlay">
            <div className="modal-container">
                <img src={image} alt={title} className="img modal-img" />
                <div className="modal-content">
                    <h4>{title}</h4>
                    <p>Cooking Instructions</p>
                    <p>{text}</p>
                    <a href={source} target="_blank" rel="noreferrer">View Recipe Source</a>
                    <button className="btn close-btn btn-hipster" onClick={closeModal}>Close</button>
                </div>
            </div>
        </aside>
    )
}
export default Modals;