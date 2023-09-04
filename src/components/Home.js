import React, { useState, useEffect } from 'react'
import RestaurantCard, { withPromoted } from './RestaurantCard'
import Shimmer from './Shimmer';

import { Link } from 'react-router-dom';
import useOnlineStatus from '../hooks/useOnlineStatus';
import Banner from './Banner';
import FoodCategories from './FoodCategories';
import { CORS_PROXY_URL } from '../utils/constants';

const Home = () => {
    const [listOfRestaurants, setListOfRestaurants] = useState([]);
    const [sortedRestaurants, setSortedRestaurants] = useState([]);
    const [sortType, setSortType] = useState('default');
    const onlineStatus = useOnlineStatus(); 
    const { lat, lng, address } = JSON.parse(localStorage.getItem("swgy_userLocation"));
    const city = address?.split(",")[0];

    // HOC
    const RestaurantCardPromoted = withPromoted(RestaurantCard);

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res = await fetch(`${CORS_PROXY_URL}https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`)
            const {data} = await res.json()

            const [restGridObj] = data?.cards?.filter(({ card: { card } }) => card?.id === "top_brands_for_you")
            
            setListOfRestaurants(restGridObj?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            setSortedRestaurants(restGridObj?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        } catch(error) {
            console.error(error);
        }
    }

    const handleSortChange = (e) => {
        setSortType(e.target.value);
    };

    const handleApplySort = () => {
        const sortedRestaurants = [...listOfRestaurants];

        if (sortType === 'delivery') {
            sortedRestaurants.sort((a, b) => a?.info?.sla?.deliveryTime - b?.info?.sla?.deliveryTime);
        } else if (sortType === 'rating') {
            sortedRestaurants.sort((a, b) => b?.info?.avgRating - a?.info?.avgRating);
        } else if (sortType === 'priceL2H') {
            sortedRestaurants.sort((a, b) => {
                let priceA = Number(a?.info?.costForTwo?.split(" ")[0].slice(1));
                let priceB = Number(b?.info?.costForTwo?.split(" ")[0].slice(1));
                return priceA - priceB;
            });
        } else if (sortType === 'priceH2L') {
            sortedRestaurants.sort((a, b) => {
                let priceA = Number(a?.info?.costForTwo?.split(" ")[0].slice(1));
                let priceB = Number(b?.info?.costForTwo?.split(" ")[0].slice(1));
                return priceB - priceA;
            });
        } else {}
        setSortedRestaurants(sortedRestaurants);
    };


    if(!onlineStatus) {
        return (
            <h2>Looks like you're offline!! Please check your internet connection.</h2>
        )
    }

    if(sortedRestaurants?.length === 0) {
        return <Shimmer />
    }

	return (
		<div className="body max-w-[1080px] mx-auto pt-[80px] pb-48">
            
            <Banner />
            <FoodCategories />

            <hr className="border my-[24px] bg-gray-50" />

            <div className="flex items-center justify-between mb-8 mt-[35px]">
                <h1 className="font-bold text-2xl">Restaurants with online food delivery in {city}</h1>

                {listOfRestaurants?.length > 0 && (
                    <div>
                        <label className="mr-3 font-medium">Sort By</label>
                        <select value={sortType} className="border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#fc8019]" onChange={handleSortChange}>
                            <option value="default">Relevance &#40;default&#41;</option>
                            <option value="delivery">Delivery Time</option>
                            <option value="rating">Rating</option>
                            <option value="priceL2H">Price: Low to high</option>
                            <option value="priceH2L">Price: High to Low</option>
                        </select>
                        <button className="outline-0 bg-none text-[#fc8019] font-medium mx-4" onClick={handleApplySort}>Apply</button>
                    </div>
                )}
            </div>

            {
                sortedRestaurants?.length > 0 ? 
                <div className="restaurant-container grid grid-cols-4 gap-8">
                    {sortedRestaurants?.map(({info}) => (
                        <Link key={info?.id} to={`/restaurant/${info?.id}`} 
                            className="transition-all duration-100 hover:scale-95" 
                        >
                            {info.promoted ? <RestaurantCardPromoted resData={info} /> : 
                            <RestaurantCard resData={info} />}
                        </Link>
                    ))}
                </div> : 
                <h2 className="w-full">Looks like there is some problem! Try refreshing the page again...</h2>
            }
		</div>
	)
}

export default Home