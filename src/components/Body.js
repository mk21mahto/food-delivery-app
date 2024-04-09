import { useEffect, useState } from "react"
import RestaurantCard from './RestaurantCard'
import Shimmer from "./Shimmer"
import { Link } from "react-router-dom"
import useOnlineStatus from "../utils/useOnlineStatus"

const Body = () => {
    const [restaurantList, setRestaurantList] = useState([])
    const [filteredRestaurant, setFilteredRestaurant] = useState([])
    const [searchText, setSearchText] = useState("")
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        const json = await data.json()
        setRestaurantList(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
    }   

   const onlineStatus = useOnlineStatus()

    if(onlineStatus === false) {
        return <h1>offline</h1>
    }
    if(restaurantList.length === 0) {
        return <Shimmer />
    }

    return (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text" className="search-box" value={searchText} onChange={(e) => {
                        setSearchText(e.target.value)
                    }}/>
                    <button onClick={() => {
                        const filteredRestaurant = restaurantList.filter((res) => res.info.name.toLowerCase().includes(searchText.toLowerCase()) )
                        setFilteredRestaurant(filteredRestaurant)
                    }}>Search</button>
                </div>
                <button className="filter-btn" onClick={ () => {
                    filteredList = restaurantList.filter(restaurant => {
                        return restaurant.info.avgRating > 4.3
                    })
                    setRestaurantList(filteredList)
                }}> Top Rated Restaurants</button>
            </div>
            <div className="res-container">
                {
                    filteredRestaurant.map(restaurant => 
                    <Link key={restaurant.info.id} to={"/restaurant/"+restaurant.info.id}><RestaurantCard  data={restaurant}/></Link>)
                }
            </div>
        </div>
    )
}

export default Body