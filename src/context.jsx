import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
const AppContext = React.createContext()

const getFavoritesFromLocalStorage = () => {
        let favorites = localStorage.getItem('favorites')

        if (favorites) {
            favorites =JSON.parse(localStorage.getItem('favorites'))
        } else {
            favorites = []
        }
        return favorites
    }
const AppProvider = ({ children }) => {

    const allMealsUrl = 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    const randomMealUrl = 'https://www.themealdb.com/api/json/v1/1/random.php'

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const [showModal, setShowModal] = useState(false)
    const [selectedMeal, setSelectedMeal] = useState(null)
    const [favorites, setFavorites] = useState(getFavoritesFromLocalStorage())

    const fetchMeals = async (url) => {
        setLoading(true)
            try {
                const { data } = await axios(url)
                if (data.meals) {
                    setMeals(data.meals)
                } else {
                    setMeals([])
                }
            } catch (error) {
                console.log(error.response)
            }
            setLoading(false)
        } 
        
    useEffect(() => {
        fetchMeals(allMealsUrl)
    }, [])
    
    useEffect(() => {
        if(!searchTerm) return
        fetchMeals(`${allMealsUrl}${searchTerm}`)
    }, [searchTerm])
    
    const fetchRandomMeal = () => {
        fetchMeals(randomMealUrl)
    }

    const selectMeal = (idMeal, favoriteMeal) => {
        let meal;
        if (favoriteMeal) {
            meal = favorites.find((meal) => meal.idMeal === idMeal)
        } else {
            meal = meals.find((meal) => meal.idMeal === idMeal)
        }
        setSelectedMeal(meal)
        setShowModal(true)
    }

    const addToFavorites = (idMeal) => {
        const alreadyFavorite = favorites.find((meal) => meal.idMeal === idMeal)
        
        if (alreadyFavorite) return 
        const meal = meals.find((meal) => meal.idMeal === idMeal)
        const updatedFavorites = [...favorites, meal];
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }

    const removeFromFavorites = (idMeal) => {
        const updatedFavorites = favorites.filter((meal) => meal.idMeal !== idMeal)
        setFavorites(updatedFavorites)
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites))
    }
    const closeModal = () => {
        setShowModal(false)
    }
    return (
        <AppContext.Provider value={{meals, loading, setSearchTerm, fetchRandomMeal, showModal, closeModal, selectedMeal, selectMeal, addToFavorites, removeFromFavorites, favorites}}>
            {children}
        </AppContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AppContext)
}
export {AppContext, AppProvider}