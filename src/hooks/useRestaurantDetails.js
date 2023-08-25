import {useState, useEffect} from 'react'
import { CORS_PROXY_URL } from '../utils/constants';

const useRestaurantDetails = (resId) => {
    const [restaurantData, setRestaurantData] = useState(null);
    const { lat, lng } = JSON.parse(localStorage.getItem("swgy_userLocation"));

    useEffect(() => {
        fetchRestaurantsInfo()
    }, []);

    const fetchRestaurantsInfo = async () => {
        const res = await fetch(
            `${CORS_PROXY_URL}https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${resId}&submitAction=ENTER`
        )

        const {data} = await res.json()

        setRestaurantData(data);
    }

    return restaurantData;
}

export default useRestaurantDetails;