import { useState } from 'react'
import { useGlobalContext } from '../context';
import '../style/Search.css'
const Search = () => {
    const [text, setText] = useState('')

    const { setSearchTerm, fetchRandomMeal } = useGlobalContext(); 

    function handleChange (e) {
        setText(e.target.value)
    }

    function handleSubmit (e) {
        e.preventDefault();
        if (text) {
            setSearchTerm(text)
        }
    }

    function handleRandomMeal () {
        setSearchTerm('')
        setText('')
        fetchRandomMeal()
    }
    return (
        <header className='search-container'>
            <form action="#" onSubmit={handleSubmit}>
                <input type="text" className="form-input" placeholder="Type favorite meal" onChange={handleChange} value={text}/>
                <button className="btn" type='submit'>Search</button>
                <button className="btn btn-hipster" type='btn' onClick={handleRandomMeal}>Surprise me!</button>
            </form>
        </header>
    )
}
export default Search;