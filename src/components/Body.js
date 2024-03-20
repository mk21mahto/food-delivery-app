import { useEffect, useState } from "react"
import { cardData } from "../utils/mockData"
import RestaurantCard from './RestaurantCard'

const Body = () => {
    let data = cardData.gridElements.infoWithStyle.restaurants
    const [restaurantList, setRestaurantList] = useState(data)

    return (
        <div className="body">
            <div className="search">Search</div>
            <div className="filter">
                <button className="filter-btn" onClick={ () => {
                    filteredList = restaurantList.filter(restaurant => {
                        return restaurant.info.avgRating > 4.3
                    })
                    setRestaurantList(filteredList)
                }}> Top Rated Restaurants</button>
            </div>
            <div className="res-container">
                {
                    restaurantList.map(restaurant => <RestaurantCard key={restaurant.info.id} data={restaurant}/>)
                }
            </div>
        </div>
    )
}

export default Body